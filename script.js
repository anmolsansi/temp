function calc1(){
    let total = parseFloat(document.getElementById("total").value).toFixed(2)
    if(total<0){
        document.getElementById("tip").value = 0
        document.getElementById("tipPercent").value = 0
        document.getElementById("tipAmount").value = 0
        document.getElementById("totalWithTip").value = 0
        document.getElementById("tip").disabled = true
        document.getElementById("errorMsg").innerHTML="Enter a valid amount"
    }
    else{
        document.getElementById("errorMsg").innerHTML=""
        document.getElementById("tip").disabled = false
        calc2()
    }
}

function calc2(){
    let total = parseFloat(document.getElementById("total").value)
    let tip = parseInt(document.getElementById("tip").value)
    
    document.getElementById("tipPercent").value = tip
    let ans1 = total*tip/100
    document.getElementById("tipAmount").value = ans1.toFixed(2)
    let ans2 = total+(total*tip/100)
    document.getElementById("totalWithTip").value = ans2.toFixed(2)
}