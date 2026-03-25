import PDFSection from '../PDFSection/PDFSection';
import styles from './PDFLibrary.module.css';

import macroThumb from '../../assets/images/macronutrient-thumb.png';
import myFitnessPalThumb from '../../assets/thumbnails/trackingGuide-thumb.png';
import flexibleDietingThumb from '../../assets/thumbnails/flexibleDieting-thumb.png';

export default function PDFLibrary() {
  const pdfs = [
    {
      title: 'Macronutrient Guide',
      file: '/PDF/MacronutrientsGuide.pdf',
      description: 'Learn how to balance your protein, carbs, and fats for better results.',
      thumbnail: macroThumb,
    },
    {
      title: 'MyFitnessPal Guide',
      file: '/PDF/MyFitnessPalGuide.pdf',
      description: 'Learn how to track calories and macros accurately using MyFitnessPal.',
      thumbnail: myFitnessPalThumb,
    },
    {
      title: 'Flexible Dieting',
      file: '/PDF/FlexibleDieting.pdf',
      description: 'Understand how flexible dieting works and how to apply it to your goals.',
      thumbnail: flexibleDietingThumb,
    },
  ];

  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Nutrition Guides</h2>

      <p className={styles.subtitle}>
        Simple guides to help you understand nutrition, tracking, and better food choices.
      </p>

      <div className={styles.grid}>
        {pdfs.map((pdf, index) => (
          <PDFSection key={index} {...pdf} />
        ))}
      </div>
    </div>
  );
}
