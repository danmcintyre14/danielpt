import PDFSection from '../PDFSection/PDFSection';
import styles from './PDFLibrary.module.css';
import macroThumb from '../../assets/images/macronutrient-thumb.png';
import myFitnessPalThumb from '../../assets/Thumbnails/trackingGuide-thumb.png';
import flexibleDietingThumb from '../../assets/Thumbnails/flexibleDieting-thumb.png';

export default function PDFLibrary() {
  const pdfs = [
    {
      title: 'Macronutrient Guide',
      file: '/PDF/MacronutrientsGuide.pdf',
      description: 'Understand how to balance your macros for better performance.',
      thumbnail: macroThumb,
    },
    {
      title: 'MyFitnessPal Guide',
      file: '/PDF/MyFitnessPalGuide.pdf',
      description: 'A full guide to tracking calories via MyFitnessPal.',
      thumbnail: myFitnessPalThumb,
    },
    {
      title: 'Flexible Dieting',
      file: '/PDF/FlexibleDieting.pdf',
      description:
        'Flexible dieting is an evidence-based, adaptable nutrition strategy that allows individuals to reach their goals without extreme restrictions.',
      thumbnail: flexibleDietingThumb,
    },
    // Add more PDFs as needed
  ];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>PDF Resources</h2>
      <div className={styles.grid}>
        {pdfs.map((pdf, index) => (
          <PDFSection key={index} {...pdf} />
        ))}
      </div>
    </div>
  );
}
