/*
 PROPERTY DATA: the only place to manage listings.
 ADD: copy one object, give it a new unique id and ref.   EDIT: change fields.   DELETE: remove the object.
 pricePKR is always PKR (a number). Images: put files in /public/properties/<id>/ and list them as '/properties/<id>/1.jpg'.
 Videos: YouTube / Vimeo / .mp4 URLs. Leave arrays empty if none.
 isSample:true shows a "sample listing" label, remove it for real listings.
*/
export const properties = [
  { id: 'adb-heights-type-a', ref: 'ADB-H-A01', name: 'ADB Heights, Type A Apartment', location: 'Regal City, Sheikhupura',
    category: 'Apartment', featured: true, status: 'Available', isSample: true, projectId: 'adb-heights', pricePKR: 25000000,
    description: 'Four-bed luxury apartment in the ADB Heights multizone complex. (Sample listing: replace with confirmed details.)',
    specs: [['Total area', '1442 sq ft'], ['Bedrooms', '4, each with attached bath'], ['Includes', 'Balcony, drawing, dining, kitchen, powder room']],
    images: ['/adb/heights.jpg'], videos: [] },
  { id: 'adb-heights-type-b', ref: 'ADB-H-B01', name: 'ADB Heights, Type B Apartment', location: 'Regal City, Sheikhupura',
    category: 'Apartment', featured: true, status: 'Available', isSample: true, projectId: 'adb-heights', pricePKR: 19000000,
    description: 'Three-bed luxury apartment in ADB Heights. (Sample listing: replace with confirmed details.)',
    specs: [['Total area', '1087 sq ft'], ['Bedrooms', '3, each with attached bath'], ['Includes', 'Balcony, drawing, dining, kitchen, powder room']],
    images: ['/adb/heights.jpg'], videos: [] },
  { id: 'adb-heights-type-c', ref: 'ADB-H-C01', name: 'ADB Heights, Type C Apartment', location: 'Regal City, Sheikhupura',
    category: 'Apartment', featured: true, status: 'Available', isSample: true, projectId: 'adb-heights', pricePKR: 16000000,
    description: 'Two-bed luxury apartment in ADB Heights. (Sample listing: replace with confirmed details.)',
    specs: [['Total area', '967 sq ft'], ['Bedrooms', '2, each with attached bath'], ['Includes', 'Balcony, drawing, dining, kitchen, powder room']],
    images: ['/adb/heights.jpg'], videos: [] },
]
