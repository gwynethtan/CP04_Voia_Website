// Alphabet button component on spelling quiz
const AlphabetButton=({index,alphabet,onClick})=>{
  var image=`https://kpilsdibrzlotjpnhvyk.supabase.co/storage/v1/object/public/media/signAlphabetImages/${alphabet.toUpperCase()}.png`;
    return(
      <button key={index} onClick={onClick} className="flex flex-col items-center bg-purple rounded-xl">
        <img src={image} alt={alphabet} className="w-16 h-16 sm:w-20 sm:h-20" />
      </button>
    );
}
export default AlphabetButton;