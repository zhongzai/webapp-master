export default{
	get:(key)=>{
		return window.localStorage.getItem(key);
	},
	set:(key,name)=>
	{
		window.localStorage.setItem(key,name);
	},
	remove:(key)=>{
		window.localStorage.removeItem(key);	
	}

}