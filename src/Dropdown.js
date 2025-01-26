import React, { useState, useRef, useEffect } from "react";
import "./dropdown.css";

const Dropdown = ({ items = [], onSelect, selectedCity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimi
  const dropdownRef = useRef(null);

  // Eğer parent bileşenden bir şehir seçildiyse searchTerm güncellenir
  useEffect(() => {
    if (selectedCity) {
      setSearchTerm(selectedCity);
    }
  }, [selectedCity]);

  // Dropdown dışına tıklayınca kapanma işlevi
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dropdown aç/kapat
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Şehir seçimi
  const selectItem = (item) => {
    setSearchTerm(item); // Seçilen şehri arama kutusuna yaz
    onSelect(item); // Parent bileşene bildir
    setIsOpen(false); // Dropdown'u kapat
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      {/* Arama Kutusu */}
      <input
        type="text"
        placeholder="Şehir seçiniz"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value); // Arama terimini güncelle
          setIsOpen(true); // Yazı yazıldığında dropdown açılır
        }}
        className="dropdown-input"
        onClick={() => setIsOpen(true)} // Tıklandığında dropdown açılır
      />

      {/* Dropdown Listesi */}
      {isOpen && (
        <div className="dropdown-list">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                key={index}
                className="dropdown-list-item"
                onClick={() => selectItem(item)}
              >
                {item}
              </div>
            ))
          ) : (
            <div className="dropdown-no-results">Sonuç bulunamadı</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
