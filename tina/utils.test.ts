import { collectionItemProps, photoItemProps, gallerySlugify } from './utils';

describe('collectionItemProps', () => {
  it('returns label from title', () => {
    expect(collectionItemProps({ title: 'My Collection' })).toEqual({ label: 'My Collection' });
  });
  it('returns Untitled Collection if no title', () => {
    expect(collectionItemProps({})).toEqual({ label: 'Untitled Collection' });
    expect(collectionItemProps(undefined as any)).toEqual({ label: 'Untitled Collection' });
  });
});

describe('photoItemProps', () => {
  it('returns filename from image URL', () => {
    expect(photoItemProps({ image: 'https://example.com/photo1.jpg' })).toEqual({ label: 'photo1.jpg' });
    expect(photoItemProps({ image: '/local/path/photo2.png' })).toEqual({ label: 'photo2.png' });
  });
  it('returns Photo if image is not a string', () => {
    expect(photoItemProps({ image: 123 as any })).toEqual({ label: 'Photo' });
  });
  it('returns Untitled Photo if no image', () => {
    expect(photoItemProps({})).toEqual({ label: 'Untitled Photo' });
    expect(photoItemProps(undefined as any)).toEqual({ label: 'Untitled Photo' });
  });
});

describe('gallerySlugify', () => {
  it('slugifies a title', () => {
    expect(gallerySlugify({ title: 'My Gallery Title!' })).toBe('my-gallery-title-');
    expect(gallerySlugify({ title: 'Another_Example 2024' })).toBe('another-example-2024');
  });
  it('returns untitled-gallery if no title', () => {
    expect(gallerySlugify({})).toBe('untitled-gallery');
    expect(gallerySlugify(undefined as any)).toBe('untitled-gallery');
  });
}); 