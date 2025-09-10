import BookDetail from '../components/BookDetail.jsx'  
import books from "../data/books.json"
import { loadWaitlistedBoxes } from "../../firebase.js";
import { useAuth } from "../../AuthContext.jsx";
import {useEffect,useState} from 'react'
import { Dropdown, DropdownItem } from "flowbite-react";

const Boxes=()=>{
  //Get user detail
  const { user } = useAuth();

  // Stores the book waitlisting state
  const [waitlistedBooks, setWaitlistedBooks] = useState([]);

  // Loads the boxes from user
  useEffect(() => {
    if (!user) return; // Wait until user is ready
    const unsubscribe = loadWaitlistedBoxes(user, setWaitlistedBooks);
    return () => unsubscribe && unsubscribe(); // Prevent memory leaks as loadWaitlistedBoxes is a onValue function
  }, [user]);

  const [searchItem, setSearchItem] = useState('')
  const [filteredBooks, setFilteredBooks] = useState(books)
  const [filterType,setFilter]=useState("All");
  
  // Stores user search input
  const handleInputChange = (e) => { 
    setSearchItem(e.target.value)
  }

  // Filters boxes whenever user uses the dropdown button or the search feature
  useEffect(() => {
    const filtered = books.filter((book) => {
      if (filterType === "Waitlist") {
        return (
          waitlistedBooks.includes(book.bookId) &&
          book.bookName.toLowerCase().includes(searchItem.toLowerCase())
        );
      } else {
        return book.bookName.toLowerCase().includes(searchItem.toLowerCase());
      }
    });
    setFilteredBooks(filtered);
  }, [searchItem, filterType, waitlistedBooks]);

  return (    
      <section className="min-h-screen pt-20 pb-3">
        <div className="text-4xl text-white font-black mb-5 flex items-center">
          <p>See</p>
          <p className="bg-orange pt-1 pb-2 px-2 rounded-xl ml-2">Boxes</p>
        </div>            
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-x-2 w-72 sm:w-96 items-center bg-card rounded-full px-3 py-2 font-medium text-lg text-white">
              <img src="/search.svg" className="w-8 h-8" />
              <input
                  type="text"
                  value={searchItem}
                  onChange={handleInputChange}
                  placeholder='Search for...'
                  className="bg-transparent"
              />
          </div>
          <Dropdown label="" dismissOnClick={false} renderTrigger={() => <img src="/filter.svg" className="w-8 h-8"/>}>
              <DropdownItem onClick={() => setFilter("Waitlist")} className="text-purple font-semibold">See waitlisted</DropdownItem>
              <DropdownItem onClick={() => setFilter("All")} className="text-purple font-semibold">See All</DropdownItem>
          </Dropdown>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-8 gap-8">
          {filteredBooks.map((book, index) => {
              if (!user) return null; 
              var waitlisted = waitlistedBooks.includes(book.bookId);
              return (
                  <BookDetail
                      key={index}
                      userId={user.uid}
                      bookId={book.bookId}
                      waitlistedBook={waitlisted}
                      bookName={book.bookName}
                      bookCover={book.bookCover}
                      bookDescription={book.bookDescription}
                  />
              );
          })}
        </div>            
      </section>
  );
}

export default Boxes;