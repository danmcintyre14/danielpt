import PDFSection from '../PDFSection/PDFSection';
import styles from './RecipeLibrary.module.css';

import highProteinLowCarbDinner from '../../assets/thumbnails/HighProteinLowCarbDinner-thumb.png';
import highProteinSnacks from '../../assets/thumbnails/HighProteinSnacks-thumb.png';
import fakeAwayDinners from '../../assets/thumbnails/fakeAwayDinners-thumb.png';

export default function RecipeLibrary() {
  const recipes = [
    {
      title: 'High Protein Low Carb Dinners',
      file: '/PDF/HighProteinLowCarbRecipeBook.pdf',
      description: 'Simple high-protein meals designed to support fat loss and muscle building.',
      thumbnail: highProteinLowCarbDinner,
    },
    {
      title: 'High Protein Snacks',
      file: '/PDF/HighProteinSnacks.pdf',
      description: 'Quick and easy snack ideas to help you hit your protein targets.',
      thumbnail: highProteinSnacks,
    },
    {
      title: 'Fake-Away Dinners',
      file: '/PDF/FakeAwayDinners.pdf',
      description: 'Healthier versions of takeaway meals to keep you on track without missing out.',
      thumbnail: fakeAwayDinners,
    },
  ];

  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Recipe Library</h2>

      <p className={styles.subtitle}>
        Simple, practical recipes to help you hit your calories and protein more easily.
      </p>

      <div className={styles.grid}>
        {recipes.map((recipe, index) => (
          <PDFSection key={index} {...recipe} />
        ))}
      </div>
    </div>
  );
}
