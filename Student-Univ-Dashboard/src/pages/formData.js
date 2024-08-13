// formData.js
const formData = [
    {
      MaisonName: "Form 1 Name",
      description: "Form 1 Description",
      price: "Form 1 Price",
      location: "Form 1 Location",
      images: ["Form 1 Image 1", "Form 1 Image 2", "Form 1 Image 3"],
      isAvailable: true,
      cliniques: [
        { name: "Clinic 1" },
        { name: "Clinic 2" },
        // Additional clinics for Form 1
      ],
    },
    {
      MaisonName: "Form 2 Name",
      description: "Form 2 Description",
      price: "Form 2 Price",
      location: "Form 2 Location",
      images: ["Form 2 Image 1", "Form 2 Image 2"],
      isAvailable: false,
      cliniques: [
        { name: "Clinic 3" },
        { name: "Clinic 4" },
        // Additional clinics for Form 2
      ],
    },
    // Additional form submissions...
  ];
  
  export default formData;
  