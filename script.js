(function GetLoser(){
    this.applicants = [];
    this.init = function(){
        this.addApplicants();
        this.result();
    };

    this.addApplicants = function(){
        function generateList(input){
            if(this.checkDuplicates(input)){
                applicants.push(input);
                console.log(applicants);
                document.getElementById("applicant-value").value = "";
                //Update the UI to show added names 
                var applicantWrapper = document.querySelector(".applicant-list-wrapper");
                applicantWrapper.innerHTML = "";
                applicants.forEach(function(applicant){
                    applicantWrapper.insertAdjacentHTML("afterbegin", "<span>" + applicant +"</span>");
                });
                
            } else{
                console.log("you suck");
                //Show error message
                document.querySelector(".error").innerHTML = "That name already exists";
                //Hide error message after 2 seconds
                setTimeout(function(){
                    document.querySelector(".error").innerHTML = "";
                }, 2000);
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

    this.checkDuplicates = function(entry){
        if(applicants.includes(entry)){
            return false;
        } else {
            return true;
        }
    };

    this.result = function(){
        var resultButton = document.getElementById("show-results");
        resultButton.addEventListener("click", function(){
            if(applicants.length <= 1){
                document.querySelector(".error").innerHTML = "Please enter at least two names";
                //Hide error message after 2 seconds
                setTimeout(function(){
                    document.querySelector(".error").innerHTML = "";
                }, 2000);
            } else {
                var loser = applicants[Math.floor(Math.random() * applicants.length)];
                console.log(loser);
                //Update the UI
                document.querySelector(".results-container").style.display = "block";
                document.querySelector(".applicant-container").style.display = "none";
                document.querySelector(".loser-display").innerHTML = loser;
            }          
        });
    };

    this.init();
})();