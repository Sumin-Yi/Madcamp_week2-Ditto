function Imageread(file){
    return new Promise((resolve, reject) => {
        if (!file || !file.type.startsWith('image/')) {
          resolve(null);
          return;
        }
    
        const reader = new FileReader();
    
        reader.onload = (e) => {
          const imageDataUrl = e.target.result;
          resolve(imageDataUrl);
        };
    
        reader.onerror = (error) => {
          reject(error);
        };
    
        reader.readAsDataURL(file);
      });
}

export default Imageread;