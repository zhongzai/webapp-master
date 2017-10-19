export default{
	get:(key)=>{
		return window.sessionStorage.getItem(key);
	},
	set:(key,name)=>
	{
		window.sessionStorage.setItem(key,name);
	}

}