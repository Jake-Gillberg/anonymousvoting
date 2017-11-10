// Relevant code that talks to Ethereum
var web3;
var password = "";
var addressChosen = false;
var addr = 0;
var state = 0;
var accountindex = 0;

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

// Local Crypto Contract
var abi_crypto = [{"constant":false,"inputs":[{"name":"params","type":"uint256[4]"},{"name":"xG","type":"uint256[2]"},{"name":"yG","type":"uint256[2]"},{"name":"y","type":"uint256[2]"},{"name":"a1","type":"uint256[2]"},{"name":"b1","type":"uint256[2]"},{"name":"a2","type":"uint256[2]"},{"name":"b2","type":"uint256[2]"}],"name":"commitToVote","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"xG","type":"uint256[2]"},{"name":"yG","type":"uint256[2]"},{"name":"w","type":"uint256"},{"name":"r2","type":"uint256"},{"name":"d2","type":"uint256"},{"name":"x","type":"uint256"}],"name":"create1outof2ZKPNoVote","outputs":[{"name":"res","type":"uint256[10]"},{"name":"res2","type":"uint256[4]"}],"type":"function"},{"constant":false,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"submod","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"x","type":"uint256"},{"name":"v","type":"uint256"},{"name":"xG","type":"uint256[2]"}],"name":"createZKP","outputs":[{"name":"res","type":"uint256[4]"}],"type":"function"},{"constant":false,"inputs":[{"name":"params","type":"uint256[4]"},{"name":"xG","type":"uint256[2]"},{"name":"yG","type":"uint256[2]"},{"name":"y","type":"uint256[2]"},{"name":"a1","type":"uint256[2]"},{"name":"b1","type":"uint256[2]"},{"name":"a2","type":"uint256[2]"},{"name":"b2","type":"uint256[2]"}],"name":"verify1outof2ZKP","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"xG","type":"uint256[2]"},{"name":"yG","type":"uint256[2]"},{"name":"w","type":"uint256"},{"name":"r1","type":"uint256"},{"name":"d1","type":"uint256"},{"name":"x","type":"uint256"}],"name":"create1outof2ZKPYesVote","outputs":[{"name":"res","type":"uint256[10]"},{"name":"res2","type":"uint256[4]"}],"type":"function"},{"constant":false,"inputs":[{"name":"xG","type":"uint256[2]"},{"name":"r","type":"uint256"},{"name":"vG","type":"uint256[3]"}],"name":"verifyZKP","outputs":[{"name":"","type":"bool"}],"type":"function"},{"inputs":[],"type":"constructor"}];
var crypto_contract = web3.eth.contract(abi_crypto);
var cryptoAddr = crypto_contract.at("0x4537d53c60729171c708168d64b560e1658124d0");


// Controls which times and dates are displayed by default
// We need to ensure there is a 'minimum' gap between default times too.
// TODO: When the 'gap' drop down box is used... update all times accordingly.
function setInitialTimes() {

   var endreg = new Date();
   var endsignuptime = new Date();
   var gap = anonymousvotingAddr.gap();

   endreg.setTime(endreg.getTime() + (gap*1000));
   // Initial time is set here.
   jQuery('#datetimepickerfinishby').datetimepicker(
     {minDate:'0', // Sets minimum date as today
      value:endreg});

   endsignuptime.setTime(endreg.getTime() + (gap*1000));
   jQuery('#datetimepickerendsignup').datetimepicker(
     {minDate:'0', // Sets minimum date as today
      value:endsignuptime});

   var endcommittime = new Date();
   endcommittime.setTime(endsignuptime.getTime() + (gap*1000));
   jQuery('#datetimepickerendcommitment').datetimepicker(
     {minDate:'0', // Sets minimum date as today
     value:endcommittime});

   var endvotetime = new Date();
   endvotetime.setTime(endcommittime.getTime() + (gap*1000));
   jQuery('#datetimepickerendvote').datetimepicker(
     {minDate:'0', // Sets minimum date as today
     value:endvotetime});

   var endrefund = new Date();
   endrefund.setTime(endvotetime.getTime() + (gap*1000));
   jQuery('#datetimepickerendrefund').datetimepicker(
     {minDate:'0', // Sets minimum date as today
     value:endrefund});


   $.datetimepicker.setLocale('en');

}

function claimUnspentDeposits() {
  web3.personal.unlockAccount(addr, password);

  anonymousvotingAddr.sendToCharity.sendTransaction({from: web3.eth.accounts[accountindex],gas: 4200000});
  alert("The charity will receive " + web3.fromWei(anonymousvotingAddr.lostdeposit()) + " ether shortly");

  return false;
}

function cancelElection() {
  web3.personal.unlockAccount(addr, password);
  var res = anonymousvotingAddr.deadlinePassed.call({ from: web3.eth.accounts[accountindex], gas: 4200000});

  if(res) {
    anonymousvotingAddr.deadlinePassed.sendTransaction({from: web3.eth.accounts[accountindex],gas: 4200000});
    document.getElementById("cancelelectionbutton").setAttribute("disabled",true);
    alert("Please wait a few minutes for the election to be cancelled.");
  }

  return false;
}
function resetElection() {

  var currentTime = new Date();
  var endRefundTime = anonymousvotingAddr.endRefundPhase() * 1000;

  web3.personal.unlockAccount(addr, password);
  var res = anonymousvotingAddr.deadlinePassed.call({ from: web3.eth.accounts[accountindex], gas: 4200000});

  if(res) {
    anonymousvotingAddr.deadlinePassed.sendTransaction({from: web3.eth.accounts[accountindex],gas: 4200000});
    document.getElementById('tallydiv').innerHTML = "Please refresh your web browser in a few minutes";
  } else {

    if(currentTime.getTime() < endRefundTime) {
      alert("A new vote cannot be started until after " + clockformat(new Date(endRefundTime)));
    } else {
      alert("Could not restart election" + anonymousvotingAddr.totaltorefund() + " AND " + anonymousvotingAddr.totalrefunded() + " ");
    }
  }

  return false;
}


// Check that the user is eligible to vote
function setEligible() {
  var tempaddr;

  if(addressChosen) {

    var lastchar = document.getElementById('addresses').value.trim().slice(-1);
    var toSplit;

    // Make sure the user has not ended the list with ','
    if(lastchar == ',') {
      var len = document.getElementById('addresses').value.length;
      toSplit = document.getElementById('addresses').value.substring(0,len-1);

    } else {
      toSplit = document.getElementById('addresses').value;
    }

    var split = toSplit.split(",");

    // TODO: Sanity check the list ... verify they are all valid Ethereum addresses
    var addresses = new Array();

    // TODO: Check with Ethereum how many addresses have ALREADY been accepted.
    // It will only hold UP to 40. No point sending 40 if Ethereum already has 25. (We should send 15 in that case).
    var uptolimit;

    if(split.length > 40) {
      if(!confirm("We can only use the first 40 addresses... Is this ok?")) {
        return;
      }
      uptolimit = 40;
    } else {
      uptolimit = split.length;
    }

    // No point re-submiting an address if it is already eligible
    for(var i=0; i<uptolimit; i++) {
      if(!anonymousvotingAddr.eligible(split[i])) {
        addresses.push(split[i]);
      }
    }

    // Do we have any addresses that are not yet eligible?
    if(addresses.length > 0) {
      web3.personal.unlockAccount(addr,password)
      var res = anonymousvotingAddr.setEligible.sendTransaction(addresses, {from:web3.eth.accounts[accountindex], gas: 4200000})

      txlist("Set Eligible: " + res);

      alert("Sent " + addresses.length + " addresses to Ethereum whitelist");
    } else {
      alert("All addresses are already eligible!");
    }

  } else {
    alert("You need to select the admin address first!");
  }
}

// Allow people to start submiting their voting key.
function beginRegistration() {

  if(!addressChosen) {
    alert("Please unlock your Ethereum address.");
    return;
  }

  if(state != 0) {
    alert("Please wait until SETUP Phase");
    return;
  }

  // Sanity check all the timer values given to us
  var finishby_val = $('#datetimepickerfinishby').datetimepicker('getValue');
  if(finishby_val == null) {
    alert("Please select the finish time for the Registration phase");
    return;
  }

  var endsignup_val = $('#datetimepickerendsignup').datetimepicker('getValue');

  if(endsignup_val == null) {
    alert("Please select which time the Registration phase MUST end before refunds are issued");
    return;
  }

  // Make sure the option is enabled (tick box is checked)
  var enableCommitment = $('#commitmenttick').is(":checked");
  var endcommitment_val = 0;

  // Only grab commitment value if that phase is enabled...
  if(enableCommitment) {

    endcommitment_val = $('#datetimepickerendcommitment').datetimepicker('getValue');

    if(endcommitment_val == null) {
      alert("Please select which time the Commitment phase MUST end before refunds are issued");
      return;
    }
  }

  var endvote_val = $('#datetimepickerendvote').datetimepicker('getValue');

  if(endvote_val == null) {
    alert("Please select which time the Computation phase MUST end before refunds are issued");
    return;
  }

  var endrefund_val = $('#datetimepickerendrefund').datetimepicker('getValue');

  if(endrefund_val == null) {
    alert("Please select the voter's refund deadline.");
    return;
  }

  var deposit_in_ether = $('#depositinput').val()

  // Make sure deposit is not too high!
  if(deposit_in_ether > 10) {

    if(!confirm("Deposit is set to " + deposit_in_ether + " ether which is high. Are you sure this is correct?")) {
      return;
    }
  }

  var deposit_in_wei = web3.toWei(deposit_in_ether,"ether"); // We assume it is in Ether

  var finishby = Math.floor(finishby_val.getTime()/1000); // Ethereum works in seconds, not milliseconds.
  var endsignup = Math.floor(endsignup_val.getTime()/1000); // Ethereum works in seconds, not milliseconds.
  var endcommitment = 0;

  // Again we only store endcommitment if the phase is enabled
  if(enableCommitment) {
    endcommitment = Math.floor(endcommitment_val.getTime()/1000); // Ethereum works in seconds, not milliseconds.
  }

  var endvote = Math.floor(endvote_val.getTime()/1000); // Ethereum works in seconds, not milliseconds.
  var endrefund = Math.floor(endrefund_val.getTime()/1000); // Ethereum works in seconds, not milliseconds.
  var question = document.getElementById('questioninput').value;

  web3.personal.unlockAccount(addr,password);

  if(anonymousvotingAddr.beginSignUp.call(question, enableCommitment, finishby, endsignup, endcommitment, endvote, endrefund, deposit_in_wei, {from:web3.eth.accounts[accountindex], value: deposit_in_wei })) {
     var res = anonymousvotingAddr.beginSignUp.sendTransaction(question, enableCommitment, finishby, endsignup, endcommitment, endvote, endrefund, deposit_in_wei, {from:web3.eth.accounts[accountindex], gas: 4200000, value: deposit_in_wei });
     destorypickers();
     document.getElementById("beginRegistrationbutton").innerHTML  = "Waiting for Ethereum to confirm that Registration has started";
     txlist("Begin Registration Phase: " + res);
  } else {
     // TODO: Better error message, and perhaps JS to enforce minimum gap etc.
     alert("Ethereum will not accept those dates and times.");
  }
}

function destorypickers() {
    $('#datetimepickerfinishby').datetimepicker('destroy');
    $('#datetimepickerendsignup').datetimepicker('destroy');
    $('#datetimepickerendcommitment').datetimepicker('destroy');
    $('#datetimepickerendvote').datetimepicker('destroy');
}
// Allow the Election Authority to finish the registration phase...
function finishRegistration() {
  if(!addressChosen) {
    alert("Please unlock your Ethereum address");
    return;
  }

  if(state != 1) {
    alert("Please wait until Registration Phase");
    return;
  }

  if(anonymousvotingAddr.totalregistered() < 3) {
    alert("Election cannot begin until there is 3 or more registered voters");
    return;
  }

  var time = new Date();
  var finishReg = anonymousvotingAddr.finishSignupPhase() * 1000;

  if(time.getTime() < finishReg) {
    alert("Please wait until " + clockformat(new Date(finishReg)) + " before finishing registration");
    return;
  }

  web3.personal.unlockAccount(addr,password);

  res = anonymousvotingAddr.finishRegistrationPhase.sendTransaction({from:web3.eth.accounts[accountindex], gas: 4200000});
  document.getElementById("finishRegistration").innerHTML  = "Waiting for Ethereum to confirm that Registration has finished";

  txlist("Finish Registration Phase: " + res);
}

// Tell Ethereum to compute Tally
function tally() {

  // Ethereum Account needs to be unlocked.
  if(!addressChosen) {
    alert("Please unlock your Ethereum address");
    return;
  }

  // Make sure we are in the correct phase.
  if(state != 3) {
    alert("Please wait until VOTE Phase");
    return;
  }
  var reg = anonymousvotingAddr.totalregistered();
  var voted = anonymousvotingAddr.totalvoted();

  // Make sure everyone has voted!
  if(!reg.equals(voted)) {
     alert("Please wait for everyone to vote");
     return;
  }

  //TODO: Check that all votes have been cast..
  // Can do this by checking the public 'votecast' mapping...
  web3.personal.unlockAccount(web3.eth.accounts[accountindex],password);
  var res = anonymousvotingAddr.computeTally.sendTransaction({from:web3.eth.accounts[accountindex], gas: 4200000});
  document.getElementById("tallybutton").innerHTML  = "Waiting for Ethereum to confirm tally";
  txlist("Compute Tally: " + res);
}

function reset() {
  web3.personal.unlockAccount(web3.eth.accounts[accountindex],password);
  var res = anonymousvotingAddr.reset.sendTransaction({from:web3.eth.accounts[accountindex], gas: 4200000});
    txlist("Reset: " + res);
}

// Update question set for vote.
function whatIsQuestion() {

  if(anonymousvotingAddr.state() > 0) {
    var q = anonymousvotingAddr.question();
    document.getElementById('title').innerHTML = q;
  }
}

// Keep a list of transaction hashes on the website. Might be useful...
function txlist(extra) {
    document.getElementById('txlist').innerHTML = document.getElementById('txlist').innerHTML + "<br>" + extra;
}

// STEP 1: User must find an Ethereum account that is recognised as the owner of the contract
// and then the user MUST log in with that account!!
var openedLogIn = false;
var signedIn = false;

function openLogin() {

  if(!openedLogIn) {
    openedLogIn = true;
    document.getElementById('login').removeAttribute("hidden");
    var selectbox = "<p>Address: <select id='addrs'>";

    var foundOwner = false;

    // Let user select one of their Ethereum addresses
    for(var i=0; i<web3.eth.accounts.length; i++) {

      if(anonymousvotingAddr.owner() == web3.eth.accounts[i]) {
        foundOwner = true;
        selectbox = selectbox + '<option value="' + i + '">' + web3.eth.accounts[i] + '</option>';
      }
    }

    selectbox = selectbox + "</select></p>";
    selectbox = selectbox + "<p>Password: <input type='password' id='passwordf' value='' name='fname'> <button onclick='unlock()' class='btn btn-primary'>Unlock</button> </p>";

    if(foundOwner) {
      document.getElementById('dropdown').innerHTML = selectbox;
    } else {
      document.getElementById('dropdown').innerHTML = "You do not have an Ethereum account that is the Election Authority for this vote";
    }
  }
}

function unlock(callback) {
  var _addr = $('#addrs').find(":selected").text();
  var _password = document.getElementById('passwordf').value;

  if(web3.personal.unlockAccount(_addr,_password)) {
    addressChosen = true;
    addr = _addr;
    password = _password;
    accountindex = $( "#addrs" ).val();
    signedIn = true;
    document.getElementById('login').setAttribute("hidden", true);
    currentState();
  }
}

// STEP 2: Admin must be able to set a list of eligible voters
var eligibletextboxCreated = false;
function createEligibleTextBox() {

  if(!eligibletextboxCreated) {
    eligibletextboxCreated = true;
    document.getElementById('title').innerHTML = "List of Eligible Voters";
    document.getElementById('question').setAttribute("hidden", true);
    document.getElementById('eligible').removeAttribute("hidden");

    // LAZY: Pre-fill the text box with my own addresses.
    for(var i=1; i<41; i++) {
       document.getElementById('addresses').value = document.getElementById('addresses').value + web3.eth.accounts[i] + ",";
    }
  }

  var res = anonymousvotingAddr.totaleligible().equals(new BigNumber("40"));
  var isHidden = document.getElementById('eligible').hasAttribute('hidden');

  if(!res && !isHidden) {
    document.getElementById('section_desc').innerHTML = "There is currently <span id='totaleligible'>0</span> eligible voters. <br> Would you like to add more?";
    document.getElementById('totaleligible').innerHTML = anonymousvotingAddr.totaleligible() + "/40";
  } else if(!isHidden) {
    document.getElementById('section_desc').innerHTML = "There is currently <span id='totaleligible'>0</span> eligible voters. <br> You cannot add any more voters.";
    document.getElementById('totaleligible').innerHTML = anonymousvotingAddr.totaleligible() + "/40";
    document.getElementById('eligible_area').setAttribute("hidden",true);
  }

}

function finishEligible() {
  if(anonymousvotingAddr.totaleligible() >= 3) {
    setInitialTimes();
    document.getElementById('title').innerHTML = "The Election Time Table";
    document.getElementById('section_desc').innerHTML = "";
    document.getElementById('eligible').setAttribute("hidden", true);
    document.getElementById('listoftimers').removeAttribute("hidden");
  } else {
    alert("A minimum number of 3 eligible voters is required before continuing.");
  }
}

var finishSettingTimes = false;

function finishSetTimes() {
  document.getElementById('title').innerHTML = "Election Configuration";
  document.getElementById('section_desc').innerHTML = "";
  document.getElementById('listoftimers').setAttribute("hidden", true);
  document.getElementById('registrationSetQuestion').removeAttribute("hidden");
}

// STEP 3: Admin must finish the registration phase
var finishRegistrationCreated = false;
function createFinishRegistration() {

  if(!finishRegistrationCreated) {
     finishRegistrationCreated = true;
    //  document.getElementById('title').innerHTML = "Voter Registration";
     document.getElementById('eligible').setAttribute("hidden", true);
     document.getElementById('registrationSetQuestion').setAttribute("hidden", true);
     document.getElementById('finishRegistration').removeAttribute("hidden");
     document.getElementById('question').removeAttribute("hidden");

     // Update the state, and finish time.
     var date = new Date();
     date.setTime(anonymousvotingAddr.endSignupPhase() * 1000);
  }

  // Make sure it exists... We might be in the 'Please wait on Ethereum' part.
  if(document.getElementById('totalregistered') != null) {
    document.getElementById('totalregistered').innerHTML = "" + anonymousvotingAddr.totalregistered() + "/" + anonymousvotingAddr.totaleligible() + " voters have registered their ballot.";

    // Statistics on number of registered voters, and when authority can transition to the next phase
    var finishby = document.getElementById('finishby');
    if(finishby != null) {
      var date = new Date();
      date.setTime(anonymousvotingAddr.finishSignupPhase() * 1000);
      document.getElementById('finishby').innerHTML = "You can finish registration after " + clockformat(date);
    }
  }

}

var commitCreate = false;
function createCommit() {

  if(!commitCreate) {
    commitCreate = true;
    document.getElementById('commit').removeAttribute("hidden");
    document.getElementById('finishRegistration').setAttribute("hidden",true);
    document.getElementById('section_desc').innerHTML = "Waiting for voters to submit a commitment, but not reveal their encrypted vote to Etheruem. ";
  }

  document.getElementById('committimer').innerHTML = "Refunds are issued after " + clockformat(new Date(anonymousvotingAddr.endCommitmentPhase() * 1000)) + " if all voters do not commit to their vote.";
  // Keep track of how many voters have been set as eligible.
  document.getElementById('totalcommit').innerHTML = anonymousvotingAddr.totalcommitted() + "/" + anonymousvotingAddr.totalregistered() + " voters have sealed their vote.";

}

var voteCreate = false;
function createVote() {

  if(!voteCreate) {
    voteCreate = true;
    document.getElementById('commit').setAttribute("hidden", true);
    document.getElementById('finishRegistration').setAttribute("hidden",true);
    document.getElementById('votephase').removeAttribute("hidden");
    document.getElementById('section_desc').innerHTML = "";
    controlTransition("#pb_cast");
  }

  document.getElementById('votetimer').innerHTML = "Refunds are issued after " + clockformat(new Date(anonymousvotingAddr.endVotingPhase() * 1000)) + " if all voters do not cast their vote.";
  document.getElementById('totalvoters').innerHTML = anonymousvotingAddr.totalvoted() + "/" + anonymousvotingAddr.totalregistered() + " voters have cast their vote.";
}

var tallyCreate = false;
function createTally() {

  if(!tallyCreate) {
    tallyCreate = true;

    document.getElementById('tallydiv').removeAttribute("hidden");

    // var res1 = anonymousvotingAddr.totalregistered().eq(anonymousvotingAddr.totalvoted());
    // var res2 = !anonymousvotingAddr.totalregistered().eq(new BigNumber("0"));
    // alert(res1 + " " + res2);

    if((anonymousvotingAddr.totalregistered().eq(anonymousvotingAddr.totalvoted())) && !anonymousvotingAddr.totalregistered().eq(new BigNumber("0"))) {
      var yes = anonymousvotingAddr.finaltally(0);
      var total = anonymousvotingAddr.finaltally(1);
      var no = total - yes;
      document.getElementById("section_desc").innerHTML = "Yes = " + yes + " and No = " + no + "<hr>";
    } else {
      document.getElementById("section_desc").innerHTML = "Voting has been cancelled.";
    }

    document.getElementById("depositrefunded").innerHTML = anonymousvotingAddr.totalrefunded() + "/" + anonymousvotingAddr.totaltorefund() + " voters have received their refund.";
    document.getElementById("newvote").innerHTML = "A new vote can begin after " + clockformat(new Date(anonymousvotingAddr.endRefundPhase()*1000));
    document.getElementById('votephase').setAttribute("hidden",true);
    document.getElementById('finishRegistration').setAttribute("hidden", true);
    document.getElementById('commit').setAttribute("hidden", true);

    controlTransition("#pb_tally");
  }
}

function clockformat(date) {

   if(date.getMinutes() < 10) {
     mins = "0" + date.getMinutes();
   } else {
     mins = date.getMinutes();
   }

   var toString = date.getHours() + ":" + mins + ", "

   toString = toString + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

   return toString;
}

var alldone = false;

// Responsible for updating the website's text depending on the election's current phase. (i.e. if we are in VOTE, no point enabling compute button).
function currentState() {

  openLogin();

  // Make sure user has unlocked an Ethereum account...
  if(!signedIn) {
    return;
  }

  checkDeadlines();

  if(alldone) {

    // Check if he has been refunded
    if(anonymousvotingAddr.refunds(web3.eth.accounts[accountindex]) > 0) {
      document.getElementById("refund-valid").removeAttribute("hidden");
    } else {
      document.getElementById("refund-valid").setAttribute("hidden",true);
    }

    // Just inform election authority that people are still being refunded.
    document.getElementById("depositrefunded").innerHTML = anonymousvotingAddr.totalrefunded() + "/" + anonymousvotingAddr.totaltorefund() + " voters have received their refund."
    return;
  }

  state = anonymousvotingAddr.state();
  whatIsQuestion();

  if(state == 0) { // SETUP

    createEligibleTextBox();
    controlTransition("#pb_setup")
  } else if(state == 1) { // SIGNUP
    createFinishRegistration();
    controlTransition("#pb_register")
    // Ensure pickers are destroyed
    destorypickers();

  } else if(state == 2) { // COMMITMENT
    createCommit();
    controlTransition("#pb_commit")
    // Ensure pickers are destroyed
    destorypickers();

  } else if(state == 3) { // VOTE
    createVote();
    controlTransition("#pb_cast")
    // Ensure pickers are destroyed
    destorypickers();

  } else if(state == 4) { // TALLY
    createTally();
    controlTransition("#pb_tally")

    //Keep track of the number of voters who have received their refund.
    alldone = true;
    // Ensure pickers are destroyed
    destorypickers();
  } else {
    document.getElementById('state').innerHTML = "Undocumented Phase...";
  }
}
setInterval("currentState()", 10000);
currentState();

var current_fs = "";

function claimrefund() {

  web3.personal.unlockAccount(addr, password);
  var res = anonymousvotingAddr.withdrawRefund.call({ from: web3.eth.accounts[accountindex], gas: 4200000});

  if(res) {
    anonymousvotingAddr.withdrawRefund.sendTransaction({from: web3.eth.accounts[accountindex],gas: 4200000});
    document.getElementById('claimrefundbutton').setAttribute("hidden", true);
    document.getElementById("waitingforrefund").removeAttribute("hidden");
  }
  // alert("test");
  return false;
}


function checkDeadlines() {

  var state = anonymousvotingAddr.state();
  var currentTime = new Date().getTime();
  var time = 9999999999999; // High value to always be greater than a unix timestamp

  // Find the relevant time...
  switch(state.toString("10")) {
    case "1":
      time = anonymousvotingAddr.endSignupPhase() * 1000;
      break;
    case "2":
      time = anonymousvotingAddr.endCommitmentPhase() * 1000;
      break;
    case "3":
      time = anonymousvotingAddr.endVotingPhase() * 1000;
      break;
    default:
      break;
  }

  if(currentTime > time) {
      document.getElementById("cancelelec").removeAttribute("hidden");
  } else {
      document.getElementById("cancelelec").setAttribute("hidden", true);
  }

  // Can the election authority claim any deposits?
  if(anonymousvotingAddr.lostdeposit() > 0) {
    document.getElementById("unspentdeposits").removeAttribute("hidden");
  } else {
    document.getElementById("unspentdeposits").setAttribute("hidden",true);
  }
}

function controlTransition(nextfs) {

  // Prevent weird loop
  if(current_fs == nextfs) {
    return;
  }

  // Nope.. jump to latest state.
  var state = anonymousvotingAddr.state();
  switch(state.toString("10")) {
    case "0":
       $("#pb_setup").addClass("active");
       break;
    case "1":
       $("#pb_setup").addClass("active");
       $("#pb_register").addClass("active");
       break;
    case "2":
       $("#pb_setup").addClass("active");
       $("#pb_register").addClass("active");
       $("#pb_commit").addClass("active");
       break;
    case "3":
       $("#pb_setup").addClass("active");
       $("#pb_register").addClass("active");
       $("#pb_commit").addClass("active");
       $("#pb_cast").addClass("active");
       break;
    case "4":
       $("#pb_setup").addClass("active");
       $("#pb_register").addClass("active");
       $("#pb_commit").addClass("active");
       $("#pb_cast").addClass("active");
       $("#pb_tally").addClass("active");
       break;
    default:
      break;
  }
}
