import "../../globals.css";

const BlogContentText = () => {
  return (
    <section className="content-blog-section py-5">
      <div className="container text-white" style={{ maxWidth: "720px" }}>
        <h1 className="text-center fw-bold mb-1">Mengenal Perbedaan PP, PE, dan PS!</h1>
        <p className="text-center text-light opacity-75 mb-4">Kamis, 30 Oktober 2025</p>

        <p className="text-justify">
          Dalam dunia plastik, istilah PP, PE, dan PS sering kali muncul, terutama pada
          kemasan, peralatan rumah tangga, hingga bahan industri. Ketiganya memang
          sama-sama jenis polimer sintetis, namun memiliki sifat, kegunaan, dan
          karakteristik yang berbeda. Mengetahui perbedaan ini penting agar kita bisa
          memilih bahan plastik yang tepat sesuai kebutuhan.
        </p>

        <p className="text-justify">
          PP (Polypropylene) dikenal karena ketahanannya terhadap panas dan bahan
          kimia. Jenis plastik ini ringan, kuat, dan sering digunakan untuk wadah
          makanan, tutup botol, sedotan, hingga peralatan laboratorium. Karena
          memiliki titik leleh tinggi, PP juga aman digunakan untuk kemasan yang perlu
          disterilisasi.
        </p>

        <p className="text-justify">
          Sementara itu, PE (Polyethylene) adalah jenis plastik yang paling umum
          digunakan di dunia. Ada dua tipe utama, yaitu LDPE (Low-Density Polyethylene)
          yang lentur seperti pada kantong plastik dan HDPE (High-Density Polyethylene)
          yang lebih keras seperti botol detergen atau galon air. PE dikenal tahan air,
          fleksibel, dan mudah didaur ulang. Sedangkan PS (Polystyrene) memiliki
          karakter yang kaku dan bening, sering digunakan untuk gelas plastik sekali
          pakai, styrofoam, dan kemasan elektronik. Namun, PS cenderung rapuh dan tidak
          tahan panas tinggi.
        </p>

        <p className="text-justify">
          Meskipun ringan, penggunaannya kini mulai dikurangi karena sulit terurai dan
          berdampak pada lingkungan. Dengan memahami karakteristik PP, PE, dan PS, kita
          bisa lebih bijak dalam memilih serta menggunakan produk plastik — tidak hanya
          dari sisi fungsional, tetapi juga dari sisi keberlanjutan dan dampak
          lingkungannya.
        </p>
      </div>
    </section>
  );
};

export default BlogContentText;
