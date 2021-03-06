import { environment } from "src/environments/environment";

// console.log('environment.production = ' ,environment.production);

export const DomainName = environment.production ? 'http://192.168.10.12:7075':'https://localhost:5001';

export const ImagePath = DomainName + '/images/products/origin/';

export const ImageGalleryPath = DomainName + '/images/products/gallery/';
