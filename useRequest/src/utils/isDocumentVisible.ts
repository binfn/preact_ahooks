import canUseDom from '../../../utils/canUseDom.ts';

export default function isDocumentVisible(): boolean {
  if (canUseDom()) {
    return document.visibilityState !== 'hidden';
  }
  return true;
}
