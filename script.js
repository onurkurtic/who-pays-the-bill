(function GetLoser(){
    this.applicants = [];
    this.init = function(){
        this.addApplicants();
    };

    this.addApplicants = function(){
        function generateList(input){
            if(this.checkDuplicates(input)){
                applicants.push(input);
                console.log(applicants);
                document.getElementById("applicant-value").value = "";
            } else{
                console.log("you suck");
                document.querySelector(".duplicate").style.display = "block";
            }                          
        };

        var button = document.getElementById("add-applicant"); 
        
        button.addEventListener("click", function(){
            var userEntry = document.getElementById("applicant-value").value;
            generateList(userEntry);
            
            
            // var applicantWrapper = document.querySelector(".applicant-list-wrapper");

            
            // applicantWrapper.innerHTML = "";

            // applicants.forEach(function(applicant){
            //     applicantWrapper.insertAdjacentHTML("afterbegin", "<span>" + applicant +"</span>");
            // });    

            

        });
    };

    this.checkDuplicates = function(entry){
        if(applicants.includes(entry)){
            return false;
        } else {
            return true;
        }
    };

    this.init();
})();