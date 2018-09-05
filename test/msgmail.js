var Rega = require("./rega");
var logger = Rega.getLogger('rega.msgmail');

var msgmail = function() {

    this.send = function( req, res ) {
        logger.trace( "send: starting" );
        var multer  = require('multer');
        var upload = multer( );

        var cpUpload;
            cpUpload = upload.array(  );
        try {
            logger.trace( "send: calling multer" );
            cpUpload( req, res, function( err ) {
                if( err ) {
                    logger.error( "send: ", err );
                    res.status(500).send("Internal server error");
                } else {
                    Rega.registerEvent("LUGGAGE-MSGMAIL", "emai", req.body.email);
                    Rega.registerEvent("LUGGAGE-MSGMAIL", "subject", req.body.subject);
                    Rega.registerEvent("LUGGAGE-MSGMAIL", "message", req.body.message);

                    res.status(200).send('ok');
                }
            });
        } catch( exc ) {
            logger.warn( "send: exception was caught: ", exc );
            res.status(500).send("Internal server error");
        }
    };
};

module.exports = msgmail;