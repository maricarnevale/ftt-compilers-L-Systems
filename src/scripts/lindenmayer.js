function lindenmayer(string) {
  let outputstring = ''; // start a blank output string

  // iterate through 'therules' looking for symbol matches:
  for (let symbol of string) {
    //let ismatch = 0; // by default, no match
    for (let [axiom, rule] of rules.entries()) {
      if (symbol == axiom) {
        outputstring += rule; 
        ismatch = 1; 
        break; 
      }
      else outputstring += symbol;
    }
  }
  return outputstring; 
}