import PDFSection from '../PDFSection/PDFSection';
import styles from './RecipeLibrary.module.css';
import highProteinLowCarbDinner from '../../assets/Thumbnails/HighProteinLowCarbDinner-thumb.png';
import highProteinSnacks from '../../assets/Thumbnails/HighProteinSnacks-thumb.png';
import fakeAwayDinners from '../../assets/Thumbnails/fakeAwayDinners-thumb.png';



export default function RecipeLibrary() {
  const recipes = [
    {
      title: 'High Protein Low Carb Dinners',
      file: '/PDF/HighProteinLowCarbRecipeBook.pdf',
      description: 'A collection of delicious high-protein meals to fuel your goals.',
      thumbnail: highProteinLowCarbDinner,
    },
    {
      title: 'High Protein Snacks',
      file: '/PDF/HighProteinSnacks.pdf',
      description: 'A collection of delicious high-protein snacks to fuel your goals.',
      thumbnail: highProteinSnacks,
    },
    {
      title: 'Fake-Away Dinners',
      file: '/PDF/FakeAwayDinners.pdf',
      description: 'A collection of delicious high-protein snacks to fuel your goals.',
      thumbnail: fakeAwayDinners,
    },
  
    // Add more books here
  ];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Recipe Books</h2>
      <div className={styles.grid}>
        {recipes.map((recipe, index) => (
          <PDFSection key={index} {...recipe} />
        ))}
      </div>
    </div>
  );
}
