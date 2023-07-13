export function checkUsername(username: string, skipForbiddenNames: boolean = false) {
    if (username.length < 4 || username.length > 30) {
        return {message: "Username must be between 4 and 30 characters"}
    }

    const trimmedUsername = username.trim();

    const hasValidCharacters = /^[A-Za-z][A-Za-z0-9._-]*[A-Za-z0-9]$/.test(
        trimmedUsername
    );

    if (!hasValidCharacters) {
        return {message: "Username must containt at least 4 alphabetical characters and can only include A-Z, numbers, dot, underscore, and hyphen. It cannot start or end with dot, underscore, or hyphen."}
    }

    if (!skipForbiddenNames) {
        const forbiddenUsernames = [
            "admin",
            "administrator",
            "root",
            "sysadmin",
            "system",
            "superuser",
            "support",
            "webmaster",
            "postmaster",
            "hostmaster",
            "ssladmin",
            "ssladministrator",
            "sslwebmaster",
            "sslpostmaster",
            "sslhostmaster",
            "ssl",
            "ftp",
            "mail",
            "www",
            "http",
            "https",
            "web",
            "cloud",
            "cloudflare",
            "cpanel",
            "directadmin",
            "plesk",
            "whm",
            "webmin",
            "user",
            "username",
            "test",
            "testing",
            "example",
            "demo",
            "domain",
            "website",
            "host",
            "hosting",
            "server",
            "vps",
            "dedicated",
            "dedi",
            "dedibox",
            "dedis",
            "abuse",
            "security",
            "support",
            "contact",
            "info",
            "inquiries",
            "sales",
            "marketing",
            "legal",
            "webmaster",
            "noc",
            "no-reply",
            "noreply",
            "privacy",
            "terms",
            "tos",
            "webteam",
            "webmaster",
            "payment",
            "info",
            "moderation",
            "newsletter",
            "message",
            "contact",
            "contactus",
            "contact-us",
            "contact_me",
            "contact-me",
            "contactus",
            "contact-us",
        ];

        if (forbiddenUsernames.includes(trimmedUsername)) {
            return {message: "Username is not allowed" }
        }
    }

      return {message: ""};
}

export function checkPassword(password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
        return {message: "Passwords do not match"}
    }

    if (password.length < 6 || !password.match(/[^a-zA-Z0-9]/)) {
        return {message: "Password must be at least 6 characters long and contain at least 1 special character"}
    }

    return {message: ""};
}