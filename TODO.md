Implement proper (de)serialisation when interacting with localstorage
Easiest to do this by serialising in DataCharacter.writeData() and simplifying internal data model to string -> string
