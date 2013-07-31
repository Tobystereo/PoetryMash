// Petry_Shake.pde
// 
// http://www.tobystereo.com
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

/*
* Poetry Shake mashes up Shakespeare sonnets to create new and unexpected poetry.
* It is as an experimantal foray into new forms of literature.
* 
* Shakespearean Sonnets follow a strict pattern adn are therefore predestined to be remixed.
* The usual rhyme scheme is end-rhymed a-b-a-b, c-d-c-d, e-f-e-f, g-g.
*/

/*
* Vision:
* Sonnet DJ
* the user can select between 2, 3 or 6 sonnets.
* the user can assign each sonnet to a spot in the new sonnet
* 
* 2 Sonnets
* - 1 (a, c, e, g)
* - 2 (b, d, f)
* 
* 3 Sonnets
* - 1 (a, c, e)
* - 2 (b, d, f)
* - 3 (g)
* 
* 6 Sonnets
* 1 sonnet for each character
*/


/*
* TODO:
* replace '*' character in strings
* create interface controls for two sonnets
* 
*/



String sonnets;

void setup() {
  String lines[] = loadStrings("../assets/shakespeare_sonnets4.csv");
  int numberOfSonnets = lines.length;
  int numberOfSonnetLines = 20;
  String[][] splitLines = new String[numberOfSonnets][numberOfSonnetLines];
  
  println("there are " + lines.length + " lines");
  println("line 1: " + lines[0]);

  for (int i=0; i < lines.length; i++) {
    String lineContent[] = split(lines[i],"*,");
    
    for (int j=0; j<lineContent.length; j++) {
//      char asterisk = '*';
//      char empty = '\0';
//      lineContent[i] = lineContent[i].replace(asterisk, empty);   
      splitLines[i][j] = lineContent[j];    
    }

  }

 println(splitLines[0][0]);
}

void draw() {

}
