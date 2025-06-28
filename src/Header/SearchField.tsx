import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { clothesList } from "../ClothesList";
import type { clotheList } from "../ClothesList";
import './SearchField.css';

function SearchField() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<clotheList[]>([])
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setSearch('')
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, []);

  const handleSearch = (term: string) => {
    setSearch(term);

    if (term.trim() === '') {
      setSearchResults([]);
      return;
    }

    const resultsSearch = clothesList.filter(item =>
      item.individualName.toLowerCase().includes(term.toLowerCase()) ||
      item.brand.toLowerCase().includes(term.toLowerCase())
    );

    setSearchResults(resultsSearch);
  };

  return (
    <div className="search-results-wrapper">
      <div className="search-container" ref={resultsRef}>
        <input
          type="search"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Поиск"
          className="search-input"
        />
        {search && (
          <div className="search-result">
            {searchResults.length > 0 ? (
              searchResults.map(item => (
                <Link key={item.id} to={`/product/${item.id}`} className="search-item-link">
                  <div className="search-item">
                    <img src={item.img} alt={item.individualName} className="search-item-img" />
                    <div className="search-item-info">
                      <div className="search-item-title">{item.individualName}</div>
                      <div className="search-item-meta">
                        <span className="search-item-brand">{item.brand}</span>
                        <span className="search-item-price">{item.price} ₽</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="no-result">Не найдено</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchField;