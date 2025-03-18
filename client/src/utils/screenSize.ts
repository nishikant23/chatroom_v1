

export const screenSize = ():number => {
    const navbarHt = document.getElementById('navbar')?.clientHeight || 0; //gets the Navbar comp ht.
    const screenHt = window.innerHeight; //curren client screen window ht.
    const size = screenHt - navbarHt;
    // alert("From Utils screen size = "+size )
   return size;
}