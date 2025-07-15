import { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css'

interface Product {
  id: number;
  individualName: string;
  category: 'clothes' | 'shoes' | 'bags';
  type: string;
  gender: string;
  color: string;
  material: string;
  brand: string;
  price: number;
  imgUrl: string;
  isSpecial: boolean;
}

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    individualName: '',
    category: 'clothes' as 'clothes' | 'shoes' | 'bags',
    clothesType: '',
    shoesType: '',
    bagType: '',
    gender: '',
    color: '',
    material: '',
    brand: '',
    price: '',
    imgUrl: '',
    isSpecial: ''
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
  setIsLoading(true);
  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.get('http://localhost:3000/api/admin/products', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Добавьте проверку, что data - массив
    if (Array.isArray(data)) {
      setProducts(data);
    } else {
      setProducts([]); // Установите пустой массив, если данные невалидны
      console.error('Ожидался массив продуктов, но получено:', data);
    }
    
    setError('');
  } catch (err) {
    setError('Ошибка загрузки товаров');
    console.error(err);
    setProducts([]); // Установите пустой массив при ошибке
  } finally {
    setIsLoading(false);
  }
};
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const productData = {
      ...formData,
      price: Number(formData.price),
      isSpecial: formData.isSpecial === 'yes',
      [formData.category === 'clothes' ? 'clothesType' : 
       formData.category === 'shoes' ? 'shoesType' : 'bagType']: 
       formData[formData.category === 'clothes' ? 'clothesType' : 
       formData.category === 'shoes' ? 'shoesType' : 'bagType']
    };

    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await axios.put(`http://localhost:3000/api/admin/products/${editingId}`, {
          ...productData,
          category: formData.category
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:3000/api/admin/products', {
          ...productData,
          category: formData.category
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      resetForm();
      await fetchProducts();
      setError('');
    } catch (err) {
      setError('Ошибка сохранения товара');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEdit = (product: Product) => {
    setFormData({
      individualName: product.individualName,
      category: product.category as 'clothes' | 'shoes' | 'bags',
      clothesType: product.category === 'clothes' ? product.type : '',
      shoesType: product.category === 'shoes' ? product.type : '',
      bagType: product.category === 'bags' ? product.type : '',
      gender: product.gender,
      color: product.color,
      material: product.material,
      brand: product.brand,
      price: String(product.price),
      imgUrl: product.imgUrl,
      isSpecial: product.isSpecial ? 'yes' : 'no'
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id: number, category: 'clothes' | 'shoes' | 'bags') => {
    if (window.confirm('Удалить этот товар?')) {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/api/admin/products/${id}`, {
          data: { category },
          headers: { Authorization: `Bearer ${token}` }
        });
        await fetchProducts();
        setError('');
      } catch (err) {
        setError('Ошибка удаления товара');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      individualName: '',
      category: 'clothes',
      clothesType: '',
      shoesType: '',
      bagType: '',
      gender: '',
      color: '',
      material: '',
      brand: '',
      price: '',
      imgUrl: '#',
      isSpecial: 'no'
    });
    setEditingId(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="admin-panel">
      <h2>{editingId ? 'Редактировать товар' : 'Добавить новый товар'}</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Категория:</label>
          <select
            name="category"
            value={formData.category}
            onChange={(e) => setFormData({
              ...formData, 
              category: e.target.value as 'clothes' | 'shoes' | 'bags'
            })}
            required
            disabled={isLoading}
          >
            <option value="clothes">Одежда</option>
            <option value="shoes">Обувь</option>
            <option value="bags">Сумки</option>
          </select>
        </div>

        <div className="form-group">
          <label>Название:</label>
          <input
            type="text"
            name="individualName"
            value={formData.individualName}
            onChange={(e) => setFormData({...formData, individualName: e.target.value})}
            required
            disabled={isLoading}
          />
        </div>

        {formData.category === 'clothes' && (
          <div className="form-group">
            <label>Тип одежды:</label>
            <input
              type="text"
              name="clothesType"
              value={formData.clothesType}
              onChange={(e) => setFormData({...formData, clothesType: e.target.value})}
              required
              disabled={isLoading}
            />
          </div>
        )}

        {formData.category === 'shoes' && (
          <div className="form-group">
            <label>Тип обуви:</label>
            <input
              type="text"
              name="shoesType"
              value={formData.shoesType}
              onChange={(e) => setFormData({...formData, shoesType: e.target.value})}
              required
              disabled={isLoading}
            />
          </div>
        )}

        {formData.category === 'bags' && (
          <div className="form-group">
            <label>Тип сумки:</label>
            <input
              type="text"
              name="bagType"
              value={formData.bagType}
              onChange={(e) => setFormData({...formData, bagType: e.target.value})}
              required
              disabled={isLoading}
            />
          </div>
        )}

        <div className="form-group">
          <label></label>
          <select
            name="gender"
            value={formData.gender}
            onChange={(e) => setFormData({...formData, gender: e.target.value})}
            required
            disabled={isLoading}
          >
            <option value="">Выберите пол</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
            <option value="unisex">Унисекс</option>
          </select>
        </div>

        <div className="form-group">
          <label>Цвет:</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={(e) => setFormData({...formData, color: e.target.value})}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Материал:</label>
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={(e) => setFormData({...formData, material: e.target.value})}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Бренд:</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={(e) => setFormData({...formData, brand: e.target.value})}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Цена:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label> URLизображения:</label>
          <input
            type="text"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={(e) => setFormData({...formData, imgUrl: e.target.value})}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Специальное предложение:</label>
          <select
            name="isSpecial"
            value={formData.isSpecial}
            onChange={(e) => setFormData({...formData, isSpecial: e.target.value})}
            disabled={isLoading}
          >
            <option value="no">Нет</option>
            <option value="yes">Да</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Загрузка...' : editingId ? 'Обновить' : 'Добавить'}
          </button>
          {editingId && (
            <button 
              type="button" 
              onClick={resetForm}
              disabled={isLoading}
            >
              Отмена
            </button>
          )}
        </div>
      </form>

      <div className="products-list">
        <h3>Список товаров</h3>
        {isLoading ? (
          <div>Загрузка...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Название</th>
                <th>Категория</th>
                <th>Тип</th>
                <th>Цена</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.individualName}</td>
                  <td>
                    {product.category === 'clothes' ? 'Одежда' : 
                     product.category === 'shoes' ? 'Обувь' : 'Сумки'}
                  </td>
                  <td>{product.type}</td>
                  <td>{product.price} ₽</td>
                  <td>
                    <button 
                      onClick={() => handleEdit(product)}
                      disabled={isLoading}
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id, product.category)}
                      disabled={isLoading}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;