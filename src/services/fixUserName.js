export default function fixUserName(name, surname) {
    return `${name.charAt(0).toUpperCase() + name.slice(1)} ${surname.charAt(0).toUpperCase() + surname.slice(1)}`;
}