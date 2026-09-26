import NotebookShowcase from '@/components/products/NotebookShowcase';
import CraftedForGlobalBrands from '@/components/products/CraftedForGlobalBrands';

export const metadata = {
  title: 'Export Notebooks & Stationery Range — Twofold Manufacturer',
  description: 'Explore Twofold high-volume notebook range including exercise books, spiral bound, double wire, hardcover, centre stitched, and glue bound notebooks.',
};

export default function ProductsPage() {
  return (
    <main>
      {/* 01 — 6-SLIDE EDITORIAL NOTEBOOK SHOWCASE */}
      <NotebookShowcase />

      {/* 02 — EXPORT QUALITY STATIONERY / CRAFTED FOR GLOBAL BRANDS BANNER */}
      <CraftedForGlobalBrands />
    </main>
  );
}
