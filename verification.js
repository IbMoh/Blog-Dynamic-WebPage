// verifying the input that is given and displaying a new message //

try{

    let submit = document.getElementById("submit")

    submit.addEventListener("click", event => {
    
        let form = document.getElementsByClassName("form")
        let confirm = document.getElementById("confirm")
        let name = document.getElementById("inputted-name").value.toLowerCase()
        let email = document.getElementById("inputted-email").value.toLowerCase()
        let concern = document.getElementById("concernArea")
        
        if(!validateName(name)){
            alert("Your name should not have numbers!")
            event.preventDefault()
        }
        
        if(!validateEmail(email) && validateName(name)){
            
            alert("Please check the email inputted!")
            event.preventDefault()

        }
        
        if (validateEmail(email) && validateName(name) && confirm.checked && concern){

            event.preventDefault()
            document.getElementById("contacts-form-header").textContent = 
            `Thank you ${name} for contacting us! An email has been sent to ${email}`
            Array.from(form).forEach(form => form.reset())

        }
    
        if (validateEmail(email) && validateName(name) && confirm.checked){
            
            event.preventDefault()
            document.getElementById("new-account-welcome").textContent = 
            `Thank you ${name} for creating an account! A confirmation email has been sent to ${email}`
            Array.from(form).forEach(form => form.reset())

        }
    
    })

}catch(error){

    console.error(error)

}

function validateEmail(email){
    if(email.includes(".com") && email.includes("@")){
        return true
    }else{
        return false
    }
}

function validateName(name){
    if(isNaN(Number(name))){
        return true
    }else{
        return false
    }
}

// -------------------------------------------------------------- //