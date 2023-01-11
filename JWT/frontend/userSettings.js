
const accessToken = localStorage.getItem("accessToken");

try {
    const response = await fetch("http://localhost:5001/user-settings", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    })
    const authData = await response.json();
    if (!response.ok || response.status >= 400) {
        alert(authData?.error || response.statusText)
    };

} catch (error) {
    console.error(error);
}

