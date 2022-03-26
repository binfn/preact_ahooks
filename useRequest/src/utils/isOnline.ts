import canUseDom from '../../../utils/canUseDom.ts';

export default function isOnline(): boolean {
  if (canUseDom() && typeof navigator.onLine !== 'undefined') {
    return navigator.onLine;
  }
  return true;
}
