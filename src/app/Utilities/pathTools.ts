import { environment } from "src/environments/environment";

export const DomainName = environment.production ? 'http://localhost:7075':'https://localhost:5001';

export const ImagePath = DomainName + '/images/products/origin/';

export const ImageGalleryPath = DomainName + '/images/products/gallery/';
