import {IMAGE_BASE_URL} from './constants';

export function getImageUrl(path: string, size: 'w500' | 'original' = 'w500') {
  return `${IMAGE_BASE_URL}/${size}/${path}`;
}
