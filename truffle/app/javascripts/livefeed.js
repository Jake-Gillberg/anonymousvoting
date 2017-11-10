var web3;
var password = "ilikelittlepaddy";
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// Anonymous Voting Contract
var abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"eligible","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"xG","type":"uint256[2]"},{"name":"vG","type":"uint256[3]"},{"name":"r","type":"uint256"}],"name":"register","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[],"name":"computeTally","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"withdrawRefund","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"addressid","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"totaleligible","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"getVoter","outputs":[{"name":"_registeredkey","type":"uint256[2]"},{"name":"_reconstructedkey","type":"uint256[2]"},{"name":"_commitment","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[],"name":"endSignupPhase","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"commitmentphase","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"question","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address[]"}],"name":"setEligible","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"finishSignupPhase","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"endRefundPhase","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"h","type":"bytes32"}],"name":"submitCommitment","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"totalrefunded","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"endCommitmentPhase","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"finishRegistrationPhase","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"params","type":"uint256[4]"},{"name":"y","type":"uint256[2]"},{"name":"a1","type":"uint256[2]"},{"name":"b1","type":"uint256[2]"},{"name":"a2","type":"uint256[2]"},{"name":"b2","type":"uint256[2]"}],"name":"submitVote","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"gap","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"totalcommitted","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"votecast","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[],"name":"deadlinePassed","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"totalvoted","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"params","type":"uint256[4]"},{"name":"y","type":"uint256[2]"},{"name":"a1","type":"uint256[2]"},{"name":"b1","type":"uint256[2]"},{"name":"a2","type":"uint256[2]"},{"name":"b2","type":"uint256[2]"}],"name":"verify1outof2ZKP","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"charity","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"endVotingPhase","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"commitment","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"registered","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_question","type":"string"},{"name":"enableCommitmentPhase","type":"bool"},{"name":"_finishSignupPhase","type":"uint256"},{"name":"_endSignupPhase","type":"uint256"},{"name":"_endCommitmentPhase","type":"uint256"},{"name":"_endVotingPhase","type":"uint256"},{"name":"_endRefundPhase","type":"uint256"},{"name":"_depositrequired","type":"uint256"}],"name":"beginSignUp","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"refunds","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"state","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[],"name":"totaltorefund","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"finaltally","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"totalregistered","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"sendToCharity","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"voters","outputs":[{"name":"addr","type":"address"},{"name":"commitment","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[],"name":"lostdeposit","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"addresses","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"depositrequired","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"xG","type":"uint256[2]"},{"name":"r","type":"uint256"},{"name":"vG","type":"uint256[3]"}],"name":"verifyZKP","outputs":[{"name":"","type":"bool"}],"type":"function"},{"inputs":[{"name":"_gap","type":"uint256"},{"name":"_charity","type":"address"}],"type":"constructor"}];
var anonymousvoting = web3.eth.contract(abi);
var anonymousvotingAddr = anonymousvoting.at("0xa0a856ee329e7dd03891c3dc337b8178be397320");

//TODO: Our program only allows up to 40 addresses.
// Might be worth making that '40' a public variable...
var totalNoAddresses = 40;
var addresses = new Array();
var eligible = {};
var registered = {};
var committed = {};
var voted = {};
var uponPageLoad = true;

function currentState() {

  // If the page has just been loaded...
  // We need the list of eligible voters...
  if(uponPageLoad) {
      findEligible();
      findRegistered()
      findCommitted();
      findVoteCast();
      uponPageLoad = false;
  }

  var state = anonymousvotingAddr.state();

  // Currently in the SETUP Phase.
  if(state == 0) {
      document.getElementById("state").innerHTML = "SETUP: Election Authority sets voters as eligible.";
      findEligible();
  } else if(state == 1) { // SIGNUP Phase.
      document.getElementById("state").innerHTML = "SIGNUP: Voters can sign up.";
      findRegistered();
      findCommitted();
  } else if(state == 2) {
      document.getElementById("state").innerHTML = "COMMIT: Voters choose (and not reveal) their vote.";
      findRegistered();
      findCommitted();
  } else if(state == 3) {
      document.getElementById("state").innerHTML = "VOTE: Voters must cast (and reveal) their vote. ";
      findRegistered();
      findCommitted();
      findVoteCast();
  } else {
      var yes = anonymousvotingAddr.finaltally(0);
      var total = anonymousvotingAddr.finaltally(1);
      var no = total - yes;
      document.getElementById('state').innerHTML = "TALLY: Yes - " + yes + " No - " + no;
  }
}

// Which eligible voters have submitted their voting key?
function findRegistered() {
  // Check which voters have submited their voting key!
  for(var i=0; i<addresses.length; i++) {

     // Only check if they have not already registered
     if(!registered[addresses[i]]) {

       // Have they registered since we last checked?
       if(anonymousvotingAddr.registered(addresses[i])) {
           // Add to our HTML list
           var ul = document.getElementById("registered");
           var li = document.createElement("li");
           li.innerHTML = addresses[i];
           li.setAttribute("id", "registered-" + addresses[i]);
           li.setAttribute("class", "list-group-item ");
           ul.appendChild(li);

           registered[addresses[i]] = true;
           document.getElementById("eligible-" + addresses[i]).setAttribute("class", "list-group-item list-group-item-info");
       }
     }
  }
}

// Find which users have cast (and revealed) their vote.
function findVoteCast() {
  for(var i=0; i<addresses.length; i++) {

     // Only check if the voter has not already voted
     if(!voted[addresses[i]]) {

          //Have they voted since we last checked?
          if(anonymousvotingAddr.votecast(addresses[i])) {
            voted[addresses[i]] = true;
            var ul = document.getElementById("voted");
            var li = document.createElement("li");
            li.innerHTML = addresses[i];
            li.setAttribute("id", "voted-" + addresses[i]);
            li.setAttribute("class", "list-group-item ");
            ul.appendChild(li);

            document.getElementById("eligible-" + addresses[i]).setAttribute("class", "list-group-item list-group-item-success");
            document.getElementById("registered-" + addresses[i]).setAttribute("class", "list-group-item list-group-item-success");

            if(anonymousvotingAddr.commitmentphase()) {
               document.getElementById("committed-" + addresses[i]).setAttribute("class", "list-group-item list-group-item-success");
            }
          }
     }
  }
}

// Find which users have committed, but not revealed their vote.
function findCommitted() {

  // Lets verify this phase is active.
  if(anonymousvotingAddr.commitmentphase()) {
      $( "#commitdiv" ).show();
  } else {
      $( "#commitdiv" ).hide();
      return;
  }

  for(var i=0; i<addresses.length; i++) {

     // Only check if the voter has not already voted
     if(!committed[addresses[i]]) {

          //Have they voted since we last checked?
          if(anonymousvotingAddr.commitment(addresses[i])) {
            committed[addresses[i]] = true;
            var ul = document.getElementById("committed");
            var li = document.createElement("li");
            li.innerHTML = addresses[i];
            li.setAttribute("id", "committed-" + addresses[i]);
            li.setAttribute("class", "list-group-item ");
            ul.appendChild(li);

            document.getElementById("eligible-" + addresses[i]).setAttribute("class", "list-group-item list-group-item-danger");
            document.getElementById("registered-" + addresses[i]).setAttribute("class", "list-group-item list-group-item-danger");
          }
     }
  }
}

// Find which addresses are now eligible to vote...
function findEligible() {

    // Check if any new addresses have been set as eligible.
    for(var i=0; i<totalNoAddresses; i++) {
        var addr = anonymousvotingAddr.addresses(i) ;

        // Lets make sure this is a real address...
        if(addr != '0x') {

          // Have we seen this address before? (if so; it will already be recorded as eligible)
          if(eligible[addr] === undefined) {

            // Initialise our hashmaps, and store the address
            eligible[addr] = true;
            registered[addr] = false;
            voted[addr] = false;
            addresses.push(addr);

            // Add to our HTML list
            var ul = document.getElementById("listaddresses");
            var li = document.createElement("li");
            li.innerHTML = addr;
            li.setAttribute("id", "eligible-" + addr);
            li.setAttribute("class", "list-group-item ");
            ul.appendChild(li);
          }
        } else {
          break; // No point continuing
        }
    }
}

setInterval("currentState()", 2000);
currentState();
