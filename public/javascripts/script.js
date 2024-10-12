function confirmation(filename){
if(confirm("Sure want to delete")){
    window.location.href = `/delete/${filename}`
}else{
    return false 
}
}