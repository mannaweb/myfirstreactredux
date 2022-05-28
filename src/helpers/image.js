let base64String = "";

export const convertToBase64 = (file, setImage) => {
  if(file instanceof File && file.name) {
    const reader = new FileReader();
    
    reader.onload = () => {
      base64String = reader.result;
      const imageBase64Stringsep = base64String;
      setImage(imageBase64Stringsep);
    }

    reader.readAsDataURL(file);
  }
}