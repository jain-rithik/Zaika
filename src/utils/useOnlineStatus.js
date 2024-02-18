import { useEffect, useState } from "react";

const useOnlineStatus = () => {
	const [isOnline, setOnline] = useState(true);
	const Onlinehandler = () => {
		setOnline(true);
	};
	const Offlinehandler = () => {
		setOnline(false);
	};
	useEffect(() => {
		window.addEventListener("online", Onlinehandler);
        window.addEventListener("offline", Offlinehandler);
        console.log("Online handler run")
		return () => {
            window.removeEventListener("online", Onlinehandler);
			window.removeEventListener("offline", Offlinehandler);
            console.log("Online handler return")
		};
	}, []);
	return isOnline;
};
export default useOnlineStatus;
