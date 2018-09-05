var Rega = require("./rega");

var util = require('util');
var fs = require('fs');

var config = require('./config');
var logger = Rega.getLogger('rega.upload');

var upload = function() {
  var that = this;
  this.apply = function( req, res ) {
    Rega.registerEvent("LUGGAGE-APPLY", "luggage", "New apply was submitted");
    res.status(200).send('ok');
  }
  this.upload = function( req, res ) {
    logger.trace( "upload: starting" );
    var multer  = require('multer');
    var upload = multer({ dest: Rega.getProperty( 'casesUploadDir', './files/cases/upload') });

    var cpUpload;
      cpUpload = upload.any(  );
    try {
      logger.trace( "upload: calling multer" );
      cpUpload( req, res, function( err ) {
        if( err ) {
          logger.error( "upload: ", err );
          res.status(500).send("Internal server error");
        } else {
          try {
            logger.debug( "upload: files: ", req.files );
            for( var f = 0; f < req.files.length; f ++ ) {
              var file = req.files[f];
              var name = file.fieldname;
              var path = file.path;
              var mtype = file.mimetype;
              var i = mtype.lastIndexOf('/');
              if( i != -1 )
                ext = mtype.substring(i+1);
              else
                ext = 'jpg';
              name += '.' + ext;
              logger.debug( "upload: renaming file %s to %s", path, name);
              fs.renameSync(path, './files/cases/upload/' + name);
              res.status(200).send('ok');
              Rega.registerEvent("LUGGAGE", "file", name);
            }
            logger.debug( "upload: name: ", req.body.name );
            logger.debug( "upload: surname: ", req.body.surname );
            logger.debug( "upload: email: ", req.body.email );
            logger.debug( "upload: PIRNumber: ", req.body.PIRNumber );
            logger.debug( "upload: PIRDate: ", req.body.PIRDate );

            Rega.registerEvent( "LUGGAGE", "name", req.body.name );
            Rega.registerEvent( "LUGGAGE", "surname", req.body.surname );
            Rega.registerEvent( "LUGGAGE", "email", req.body.email );
            Rega.registerEvent( "LUGGAGE", "PIRNumber", req.body.PIRNumber );
            Rega.registerEvent( "LUGGAGE", "PIRDate", req.body.PIRDate );

          } catch( exc ) {
            logger.error( "upload: exception: ", exc );
            res.status(500).send("Internal server error");
          }

        }
      });
    } catch( exc ) {
      logger.warn( "upload: exception was caught: ", exc );
      res.status(500).send("Internal server error");
    }
  };
  this.download = function( req, res, token ) {
    var files=fs.readdirSync('./files/cases/upload/');
    logger.debug( "download: et for s", token);
    var found = false;
    for(var i=0;i<files.length;i++) {
      if( files[i].indexOf(token) != -1 ) {
        logger.debug( "download: found file %s for token %s. Sending...", files[i], token );
        res.download('./files/cases/upload/' + files[i]);
        found = true;
        break;
      }
    }
    if( !found ) {
      logger.warn( "download: get request for unknown object: token" );
      res.status(404).send('Not found');
    }
  }
};
