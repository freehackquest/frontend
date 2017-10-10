window.tools_base64 = new function() {
	this.prefix = 'tools_base64';
	// init 
	this.init = function(e){
		var pfx = this.prefix;
		e.html('<center><h1>Base64 Encode/Decode</h1><br>'
			+ 'Please enter text:<br>'
			+ '<textarea id="' + pfx + '_input_text">Example here</textarea><br><br>'
			+ '<div class="fhqbtn" id="' + pfx + '_btnencode">Base64 Encode</div>'
			+ '<div class="fhqbtn" id="' + pfx + '_btndecode">Base64 Decode</div><br><br>'
			+ 'Result:<br>'
			+ '<textarea readonly=true id="' + pfx + '_output_text">RXhhbXBsZSBoZXJl</textarea><br><br><br>'
			+ ' * JavaScript: original by: Tyler Akins (http://rumkin.com)<br>'
			+ ' * JavaScript: improved by: Bayron Guevara<br>'
			+ ' * Link to source code: http://javascript.ru/php/base64_encode<br>'
			+ '</center>');
			
		$('#' + pfx + '_btnencode').unbind('click').bind('click', function(){
			var input_text = $('#' + pfx + '_input_text').val();
			input_text = window.tools_base64.base64_encode(input_text);
			$('#' + pfx + '_output_text').val(input_text);
		});
		
		$('#' + pfx + '_btndecode').unbind('click').bind('click', function(){
			var input_text = $('#' + pfx + '_input_text').val();
			input_text = window.tools_base64.base64_decode(input_text);
			$('#' + pfx + '_output_text').val(input_text);
		});
	}
	
	// dispose
	this.dispose = function(){
		
	}
	
	// http://javascript.ru/php/base64_encode
	this.base64_encode = function( data ) {	// Encodes data with MIME base64
		// 
		// +   original by: Tyler Akins (http://rumkin.com)
		// +   improved by: Bayron Guevara

		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';

		do { // pack three octets into four hexets
			o1 = data.charCodeAt(i++);
			o2 = data.charCodeAt(i++);
			o3 = data.charCodeAt(i++);

			bits = o1<<16 | o2<<8 | o3;

			h1 = bits>>18 & 0x3f;
			h2 = bits>>12 & 0x3f;
			h3 = bits>>6 & 0x3f;
			h4 = bits & 0x3f;

			// use hexets to index into b64, and append result to encoded string
			enc += b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
		} while (i < data.length);

		switch( data.length % 3 ){
			case 1:
				enc = enc.slice(0, -2) + '==';
			break;
			case 2:
				enc = enc.slice(0, -1) + '=';
			break;
		}

		return enc;
	}
	
	this.base64_decode = function( data ) {	// Decodes data encoded with MIME base64
		// 
		// +   original by: Tyler Akins (http://rumkin.com)

		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';

		do {  // unpack four hexets into three octets using index points in b64
			h1 = b64.indexOf(data.charAt(i++));
			h2 = b64.indexOf(data.charAt(i++));
			h3 = b64.indexOf(data.charAt(i++));
			h4 = b64.indexOf(data.charAt(i++));

			bits = h1<<18 | h2<<12 | h3<<6 | h4;

			o1 = bits>>16 & 0xff;
			o2 = bits>>8 & 0xff;
			o3 = bits & 0xff;

			if (h3 == 64)	  enc += String.fromCharCode(o1);
			else if (h4 == 64) enc += String.fromCharCode(o1, o2);
			else			   enc += String.fromCharCode(o1, o2, o3);
		} while (i < data.length);

		return enc;
	}


	
};
