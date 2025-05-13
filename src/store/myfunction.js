export const iconTampil=(nilai)=>{
    if(nilai>=1){
        return <i className="fa fa-check text-success"></i>
    }else{
        return <i className="fa fa-times text-danger"></i>
    }
}