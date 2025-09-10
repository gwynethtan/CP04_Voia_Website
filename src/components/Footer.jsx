// Displays socia media links at the end of the page
const Footer=()=> {
  return (
    <footer className="">
        <div className="flex space-x-7 justify-center items-center lg:px-96">
            <a href="https://www.instagram.com/voia_official/" >
                <img src="/instagram.png" alt="Instagram" className="h-8 w-8" />
            </a>
            <a href="mailto:voia@gmail.com">
                <img src="/mail.png" alt="Email" className="h-10 w-10" />
            </a>
        </div>
        <p className="text-purple font-medium text-lg text-center pt-6 lg:pt-3 pb-4">Made with <span className="inline-block animate-bounce text-xl">💜</span> by Aura</p>
    </footer>
  );
}

export default Footer