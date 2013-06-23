/* 

Shakespeare Mashup - Sonnet Edition
Remixing Shakespeare by combining two of his sonnets to create something new and beatutiful.
An experiment in new forms of poetry.

TODO:
- random button
- deep linking / URL scheme
- visual design
- social sharing
- ability to edit lines
- drag & drop for 9 hotzones (7 rhyming pairs and A/B)

*/ 


$(document).ready(function() {
   // put all your jQuery goodness in here.

   loadFile('shakespeare_sonnets_tab.txt');

 }); 

var sonnets;
var numberOfSonnets;


function loadFile(file_name) {
	var txtFile = new XMLHttpRequest();
	txtFile.open("GET", "data/"+ file_name, true);
	txtFile.onreadystatechange = function() {
		console.log(txtFile.readyState);
		if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
	        if (txtFile.status === 200) {  // Makes sure it's found the file.
    	        var allText = txtFile.responseText;
      	        
      	        var allTextLines = allText.match(/[^\r\n]+/g);
      	         // it is both the entire match and capture. It appears regex.exec(string) returns on finding the first match regardless of global modifier, wheras string.match(regex) is honouring global.
      	        console.log("allTextLines.length: " + allTextLines.length);
      	        
      	        sonnets = new Array(allTextLines.length);
      	        numberOfSonnets = sonnets.length;

      	        console.log(allTextLines[0].split("\t"));  // tab separated

      	        for(var i=0; i<allTextLines.length; i++) {
      	        	var thisTextLine = allTextLines[i].split("\t"); // tab separated
      	        	sonnets[i] = new Array(thisTextLine.length);
      	        	
      	        	for(var j=0; j<thisTextLine.length; j++) {
	      	        	sonnets[i][j] = thisTextLine[j];
	      	        }
      	        }

      	        console.log("sonnets[0][0]: " + sonnets[0][0]);  
      	        createPlaylists(1);
      	        createPlaylists(2);
      	        sonnet1 = sonnets[0];
				sonnet2 = sonnets[0];

			} 
	    }
	}

	txtFile.send(null);
}

var playlist1_value = 1;
var playlist2_value = 1;

function createPlaylists(playlist_number) 
{
	// list 
	// for(var k=0; k<numberOfSonnets; k++) {
	// 	var theobject = document.createElement("li"); // value=\"" + (k+1) + "\"></object>");
	// 	var objectContent = document.createTextNode(k+1);
	// 	var thelink = document.createElement("a");
	// 	thelink.appendChild(objectContent);
	// 	thelink.setAttribute('href', 'javascript:selectSonnet(' + k + ')');
	// 	theobject.appendChild(thelink);
	// 	thelink.setAttribute('data-sonnetnumber', k+1);

	// 	var theplaylist = document.getElementById("playlist1");
	// 	theplaylist.appendChild(theobject);

	// 	console.log("length of this sonnet: " + sonnets[k].length);
	// }	

	var theplaylist = document.getElementById("playlist"+playlist_number);

	// dropdown
	for(var k=0; k<numberOfSonnets; k++) {
		var theobject = document.createElement("option"); // value=\"" + (k+1) + "\"></object>");
		var objectContent = document.createTextNode(sonnets[k][0]);
		theobject.appendChild(objectContent);
		theobject.setAttribute('value', k);
		
		theplaylist.appendChild(theobject);		

		console.log("length of this sonnet: " + sonnets[k].length);
	}	

	// add event listeners
	theplaylist.addEventListener('change', function() {
		var thevalue = theplaylist.options[theplaylist.selectedIndex].value;
		// var thesonnet = theplaylist.getA
		console.log(thevalue);
		
		if(playlist_number == 1) { playlist1_value = thevalue; }
		if(playlist_number == 2) { playlist2_value = thevalue; }

		selectSonnet(thevalue, playlist_number);
		mashupSonnets();
	});
}

function selectSonnet(sonnet_number, playlist_number) {
	var thedisplay = document.getElementById("playlist" + playlist_number + "_preview");
	while (thedisplay.hasChildNodes()) {
	    thedisplay.removeChild(thedisplay.lastChild);
	}
	var thesonnet = sonnets[sonnet_number];
	console.log(thesonnet);
	for (var i=0; i<thesonnet.length; i++){
		var theparagraph = document.createElement("p");
		var thesonnetline = document.createTextNode(sonnets[sonnet_number][i]);
		theparagraph.appendChild(thesonnetline);	
		thedisplay.appendChild(theparagraph);
	}
	
}

var sonnet1;
var sonnet2;

function mashupSonnets() {
	var thedisplay = document.getElementById("sonnet_mashup");
	
	sonnet1 = sonnets[playlist1_value];
	sonnet2 = sonnets[playlist2_value];

	for(var i=0; i<15; i++) {
		var the_text_node;
		var the_element;
		if ( i == 0) {
			
			// the headline
			var theheadline_text = sonnet1[0] + "/" + sonnet2[0];
			the_text_node = document.createTextNode(theheadline_text);
			the_element = document.getElementById("sonnet_mashup_headline");

		} else if ( i > 0 && i < 13) {

			if( i % 2 == 0) {
				// even rows
				the_text_node = document.createTextNode(sonnet2[i]);
				the_element = document.getElementById("line"+i);	

			} else {
				// odd rows
				the_text_node = document.createTextNode(sonnet1[i]);
				the_element = document.getElementById("line"+i);
			}

		} else {
			// the last two rows
			the_text_node = document.createTextNode(sonnet1[i]);
			the_element = document.getElementById("line"+i);
		}

		clearContent(the_element);
		the_element.appendChild(the_text_node);	
		
	}

}

function clearContent(element) {
	console.log(element);
	while (element.hasChildNodes()) {
	    element.removeChild(element.lastChild);
	}
}


// <div id="sonnet_mashup">
//     <p id="sonnet_mashup_headline" class="number"></p>
//     <p id="line01" class="a"></p>
//     <p id="line02" class="b"></p>
//     <p id="line03" class="a"></p>
//     <p id="line04" class="b"></p>
//     <p id="line05" class="c"></p>
//     <p id="line06" class="d"></p>
//     <p id="line07" class="c"></p>
//     <p id="line08" class="d"></p>
//     <p id="line09" class="e"></p>
//     <p id="line10" class="f"></p>
//     <p id="line11" class="e"></p>
//     <p id="line12" class="f"></p>
//     <p id="line13" class="g"></p>
//     <p id="line14" class="g"></p>
// </div>

