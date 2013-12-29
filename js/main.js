/* 

PoetryMash - Shakespearean Sonnet Edition
Remix Shakespeare by combining his sonnets to create something new and beatutiful.
An exploration in new forms of poetry and narrative.

TODO:
- random button
- deep linking / URL scheme
- ability to edit lines
- drag & drop for 9 hotzones (7 rhyming pairs and A/B)

*/ 


$(document).ready(function() {

   loadFile('shakespeare_sonnets_tab.txt');

 }); 

var sonnets;
var sonnet1;
var sonnet2;
var numberOfSonnets;
var playlist1_value = 0;
var playlist2_value = 0;


function loadFile(file_name) {
	var txtFile = new XMLHttpRequest();
	txtFile.open("GET", "data/"+ file_name, true);
	txtFile.onreadystatechange = function() {
		if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
	        if (txtFile.status === 200) {  // Makes sure it's found the file.
    	        var allText = txtFile.responseText;
      	        
      	        var allTextLines = allText.match(/[^\r\n]+/g);
      	         // it is both the entire match and capture. It appears regex.exec(string) returns on finding the first match regardless of global modifier, wheras string.match(regex) is honouring global.
      	        
      	        sonnets = new Array(allTextLines.length);
      	        numberOfSonnets = sonnets.length;

      	        for(var i=0; i<allTextLines.length; i++) {
      	        	var thisTextLine = allTextLines[i].split("\t"); // tab separated
      	        	sonnets[i] = new Array(thisTextLine.length);
      	        	
      	        	for(var j=0; j<thisTextLine.length; j++) {
	      	        	sonnets[i][j] = thisTextLine[j];
	      	        }
      	        }

      	        createPlaylists(1);
      	        createPlaylists(2);
      	        createSet();
      	        sonnet1 = sonnets[0];
				sonnet2 = sonnets[0];
				selectSonnet(0, 1);
				selectSonnet(0, 2);
				mashupSonnets();
			} 
	    }
	}

	txtFile.send(null);
}


function createPlaylists(playlist_number) {
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
	}	

	// add event listeners
	theplaylist.addEventListener('change', function() {
		var thevalue = theplaylist.options[theplaylist.selectedIndex].value;
		
		if(playlist_number == 1) { playlist1_value = thevalue; }
		if(playlist_number == 2) { playlist2_value = thevalue; }

		selectSonnet(thevalue, playlist_number);
		mashupSonnets();
	});
}

function createSet() {
	var thebutton = document.createElement("a");
	var thebutton_label = document.createTextNode("randomize");
	thebutton.appendChild(thebutton_label);
	thebutton.setAttribute("id", "random");
	var thedjconsole = document.getElementById("dj_console");
	thedjconsole.appendChild(thebutton);

	thebutton.addEventListener("click", function() {
		mashIt();
	});
}

function mashIt() {
	chooseRandomSonnetAndSelectInDropDown(1);
	chooseRandomSonnetAndSelectInDropDown(2);

	mashupSonnets();
}

function chooseRandomSonnetAndSelectInDropDown(playlist_number) {
	var randomSonnet = Math.random();
	randomSonnet = map(randomSonnet, 0, 1, 0, numberOfSonnets);
	randomSonnet = Math.floor(randomSonnet);

	if (playlist_number == 1) {
		playlist1_value = randomSonnet;
	} else if (playlist_number == 2) {
		playlist2_value = randomSonnet;
	}

	var theplaylist = document.getElementById("playlist" + playlist_number);
	theplaylist.selectedIndex = randomSonnet;
	
	selectSonnet(randomSonnet, playlist_number);
	
}


function selectSonnet(sonnet_number, playlist_number) {
	var thedisplay = document.getElementById("playlist" + playlist_number + "_preview");
	while (thedisplay.hasChildNodes()) {
	    thedisplay.removeChild(thedisplay.lastChild);
	}
	var thesonnet = sonnets[sonnet_number];

	for (var i=0; i<thesonnet.length; i++){
		var theparagraph = document.createElement("p");
		var thesonnetline = document.createTextNode(sonnets[sonnet_number][i]);
		theparagraph.appendChild(thesonnetline);	
		thedisplay.appendChild(theparagraph);
	}
	
}

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

			shareFacebook(theheadline_text);

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

function map(value, originalMin, originalMax, targetMin, targetMax) {
	var returnValue = targetMin + ((value-originalMin) / (originalMax-originalMin) * (targetMax-targetMin));
	return returnValue;
}

function shareFacebook(theheadline_text) {
	var fblink = document.getElementById('fblink');
	fblink.href = "http://www.facebook.com/sharer/sharer.php?s=100&p[url]=http://tobystereo.github.io/PoetryMash/&p[images][0]=&p[title]=PoetryMash:%20I%20mMshed-Up%20Shakespeare%20Sonnets%20" + theheadline_text + "&p[summary]=PoetryMash%20is%20an%20exploration%20of%20new%20forms%20of%20poetry%20and%20literature%20by%20introducing%20interaction%20and%20code.%20It%20allows%20the%20user%20to%20combine%20Shakespeare%20sonnets%20and%20create%20new%20meaning%20and%20beauty.";
}



