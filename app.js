let a =1
let b =2*a

function requestOfServer() {

    $.ajax({
        type: 'get',
        url: "http://localhost:8000/hello-world?info=OlaMundo"
    }).done(function(data) { 
        document.getElementById('developer').innerHTML = data.name
        document.getElementById('version').innerHTML = data.version
        document.getElementById('value-of-variable').innerHTML = data.value_of_variable_info
        document.getElementById('company-site').innerHTML = data.web_site_company

        $("#show-values").css('display', 'block')

    });

}

function submitDataOfUser() {
    const nameOfUser = $("#name").val()
    const lasNameOfUser = $("#lastname").val()
    const ageOfUser = $("#age").val()      
    $.ajax({
        "url": "http://localhost:8000/insert-data",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json; charset=UTF-8"
        },
        "data": JSON.stringify({
            name:nameOfUser,
            last_name:lasNameOfUser,
            age:ageOfUser
        }) 
    }).done(function (response) {
        console.log(response)
        if (response.success) {
            $("#success-record-msg").css('display','block')

            $("#name").val('')
            $("#lastname").val('')
            $("#age").val('')            
        } else {
            let errorMsg;
            let errorWidth = '350px'

            if (response.missingAttribute === 'name') {
                errorMsg = 'O campo de nome está ausente, pode preencher'
                errorWidth = '415px'
            }

            if (response.missingAttribute === 'last_name') {
                errorMsg = 'O campo de sobrenome está ausente, pode preencher'
                errorWidth = '435px'
            }

            if (response.missingAttribute === 'age') {
                errorMsg = 'O campo de idade está ausente, pode preencher'
                errorWidth = '415px'
            }

            $("#error-record-msg").css('display','block')
            $("#content-error-record-msg").html(errorMsg)
            $("#error-record-msg").css('width',errorWidth)
        }

    });
}


function closeSuccessMsg() {
    /* Jquery */
    $("#success-record-msg").css('display', 'none')

    /* vanila */
    // document.getElementById('success-record-msg').style.display = 'none'
}

function closeErrorMsg() {
    $("#error-record-msg").css('display', 'none')
}