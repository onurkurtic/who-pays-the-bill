(function GetLoser(){
    this.applicants = [];
    this.init = function(){
        this.addApplicants();
        this.result();
    };

    //===================================
    // Convert entries into titlecase
    //===================================
    this.toTitleCase = function(str){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };

    //===================================
    // Reusable timeout function for error messages
    //===================================
    this.timeout = function(){
        setTimeout(function(){
            document.querySelector(".error").innerHTML = "";
        }, 2000);
    };

    //===================================
    // Update UI when a name is deleted
    //===================================
    this.showList = function(){
        var applicantWrapper = document.querySelector(".applicant-list-wrapper");
        applicantWrapper.innerHTML = "";
        applicants.forEach(function(applicant, i){
            applicantWrapper.insertAdjacentHTML("afterbegin", '<span class="name-tag" data-id="' + i + '">' + applicant + '</span>');
        });
        deleteOne();
    };

    
    //===================================
    // Add applicant names into the list
    //===================================
    this.addApplicants = function(){

        function generateList(input){
            if(this.checkValid(input)){
                applicants.push(toTitleCase(input));
                console.log(applicants);
                document.getElementById("applicant-value").value = "";
                showList(); 
            }                        
        };

        var button = document.getElementById("add-applicant"); 
        var inputField = document.getElementById("applicant-value");

        inputField.addEventListener("keypress", function(e){
            if(e.which === 13){
                var userEntry = document.getElementById("applicant-value").value;
                generateList(userEntry); 
            }
        });
        
        button.addEventListener("click", function(){
            var userEntry = document.getElementById("applicant-value").value;
            generateList(userEntry);
        });
    };

    this.checkValid = function(entry){
        if(applicants.includes(toTitleCase(entry))){
            document.querySelector(".error").innerHTML = "That name already exists";
            timeout();
            return false;
        } else if(entry === ""){
            document.querySelector(".error").innerHTML = "Please enter a name";
            timeout();
            return false;
        } 
        else {
            return true;
        }
    };

    //===================================
    // Delete a user from the list
    //===================================
    this.deleteOne = function(){
        var items = document.querySelectorAll(".name-tag");

        function removeUser(e){
            var dataId = parseInt(e.getAttribute("data-id"));
            applicants.splice(dataId, 1);
            console.log(applicants);
            showList();
        };

        items.forEach(function(item){
            item.addEventListener("click", function(){
                removeUser(this);
            });
        });
    };

    this.randomPick = function(){
        var loser = applicants[Math.floor(Math.random() * applicants.length)];
        console.log(loser);
        //Update the UI
        document.querySelector(".results-container").style.display = "block";
        document.querySelector(".applicant-container").style.display = "none";
        document.querySelector(".loser-display").innerHTML = loser;
    };

    this.result = function(){
        var resultButton = document.getElementById("show-results");
        resultButton.addEventListener("click", function(){
            if(applicants.length <= 1){
                document.querySelector(".error").innerHTML = "Please enter at least two names";
                //Hide error message after 2 seconds
                timeout();
            } else {
                randomPick();
                resultScreen();
            }          
        });
    };

    this.resultScreen = function(){
        var runAgain = document.querySelector(".run-again");
        var startAgain = document.querySelector(".start-again");
        runAgain.addEventListener("click", randomPick);
        startAgain.addEventListener("click", function(){
            location.reload();
        });
    };

    this.init();
})();