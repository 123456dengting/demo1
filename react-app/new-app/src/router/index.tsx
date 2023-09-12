
import {  useNavigate, useLocation, useSearchParams  } from 'react-router-dom';
import Home from "../view/Home"
import Sys from "../view/Sys"

const routes = [
	{
		path:'/',
		element:<Home/>
	},
	{
		path:'/home',
		element:<Home/>
	},
	{
		path:'/sys',
		element:<Sys/>
	},
];

export const getMenuList = () => {
	return routes.filter(t => t.path !== "/");
}


export const objToQueryStr = (path: string, query: any) => {
	let str = "";
	for (const key in query) {
		if (Object.prototype.hasOwnProperty.call(query, key)) {
			const element = query[key];
			str += `${key}=${element}&`
		}
	}

	if(str){
		str = str.slice(0, -1);
	}
	return str ? `${path}?${str}` : path;
};

export const router = {
	Push: (path: string, query: any) => {
		const navigate= useNavigate();
		let str: string = objToQueryStr(path, query)
		navigate(str, {
			replace: false
		});
	},
	Replace: (path: string, query: any) => {
		const navigate= useNavigate();
		let str: string = objToQueryStr(path, query)
		navigate(str, {
			replace: true
		});
	},
	useNavigate,
	useSearchParams,
	useLocation
}




export default routes;
