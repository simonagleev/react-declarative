# Вводный брифинг по компонентам шаблонизатора react-declarative

## Компонент `One`

> One это компонет библиотеки `react-declarative`, который представляет собой форму с различными полями (fields, текстовые, картинки, рейтинг и тп) и грид разметкой, которая позволяет удобно хранить, создавать, изменять данные, например, профиля какого-либо пользователя.

Основные свойства компонента: 

### 1. fields

Основное, с чем приходится работать. Тут перечисляются поля, которые должны быть в форме. Задается через переменную `fields` (массив) c типом 'TypedField[]'. 
Пример:

```tsx
const fields: typedField[] = [
{
    type: FieldType.Group,
    fields: [
      {
        type: FieldType.Rating,
        columns: "2",
        phoneColumns: '12',
        fieldBottomMargin: "0",
        name: "rating",
        defaultValue: 3
      },
      {
        type: FieldType.Group,
        columns: "10",
        phoneColumns: '12',
        fields: [
          {
            name: 'lastName',
            type: FieldType.Text,
            title: 'Last name',
            description: 'Required',
          },
          {
            type: FieldType.Combo,
            title: "Gender",
            placeholder: "Choose your gender",
            name: "gender",
            itemList: [
              "Male",
              "Female",
            ]
          },
        ]
      }   
    ]  
}] 

export const examplePage = () => (
  <One
    fields={fields}
  /> 
);
```


Имеются следющие основные свойства:

**type** - задается тип поля. Например, `type: FieldType.Group`. Всего есть 22 типа полей.

**columns** - используется для разметки, значение string от 1 до 12, где 12 - вся ширина. (по логике грид)

**desctopColumns, tabletColumns и phoneColumns** - используются для настройки разметки на компьютере, плашете и смартфоне соответствено.

У каждого типа поля есть свои свойства, такие как: name, `title`, `fieldBottomMargin`, `outlined`, `defaultValue` и др.

`itemList` может быть асинхронным.

Для того, чтобы вставить в `fields` отдельный компонент используется `type: FieldType.Component`, где в свойстве `element` прописывается 
желаемый компонент, например: 

```tsx
{
    type: FieldType.Component,
    element: () => (
        <div> Exmaple </div>
    ),
}
```

### 2. handler

В нем должна быть функция (может вернуть промис) или ссылка на состояние компонента. Нужен для связи компонента с сервером или моковыми данными. Кстати, через композицию контекста переменных можно достучаться до `id` из роута.

### 3. fallback

Обратный вызов на случай ошибки в `handler`.

### 4. onChange
    
Функция, которая срабатывает при изменении данных в форме <One/>. Например, при изменении имени пользователя.

## Компонент `List`

>  Компонент списочной формы для удобного отображения каких-либо данных и взаимодействия с ними. Настроена пагинация и разметка.

Основные свойства компонента: 

  
### 1. filters

Элемент фильтров, который находится непосредственно над самим списком. Принимает в себя массив типа `TypedField[]` или `IField`. 

```tsx
{
    type: FieldType.Text,
    name: 'firstName',
    title: 'First name',
},
{
    type: FieldType.Text,
    name: 'lastName',
    title: 'Last name',
}
```

### 2. columns

Отвечает за колонки списка. Это должен быть массив типа `IColumn[]`. Определяет тип, название и свойства колонки(например ширину). Основные типы колонок: `ColumnType.Text`, `ColumnType.Compute`, `ColumnType.Component`, `ColumnType.CheckBox`, `ColumnType.Action` 

```tsx
{
    type: ColumnType.Text,
    field: 'name',
    headerName: 'Name',
    width: '200px',
},
{
    type: ColumnType.Component,
    field: 'countryFlag',
    headerName: 'Country',
    width: '20vw',
    element: (props) => <CountryFlag {...props} />,
},
{
    type: ColumnType.Compute,
    field: 'name',
    headerName: 'Name',
    width: 'max(15vw, 100px)',
    compute: ({ firstName, lastName }) => `${firstName} ${lastName}`,  
},
```

### 3. actions

Создает кнопку в верхнем правом углу списка с выпадающим меню опций, где перечислены возможные действия со списком или его отдельными элементами (например, создание нового пользователя). При этом логика действий тут не прописывается. Массив типа `IListAction[]`.

```tsx
{
    type: ActionType.Menu,
    options: [
        {
            action: 'create',
            label: 'Create a new person',
        },
        {
            action: 'delete',
            label: 'Delete',
        },
    ]
},
```

### 4. rowActions

То же самое, что `actions`, только в каждом отдельной строке. 

```tsx
{
    label: 'Remove this person',
    action: 'remove-action',
},
```

### 5. title

Название списка...

### 6. filterLabel

Название элемента с фильтрами...

### 7. handler

Функция, которая загружает данные в список, аналогична One.

### 8. onRowClick

Функция, которая вызывается при нажатии на какой-либо элемент списка (ряд).

### 9. onRowAction

Функция, которая вызывается в `rowActions`.

### 10. onAction

Функция, которая вызывается в `actions`.

## Компонент `Autosizer`

>  Компонент представляет собой контейнер, который автоматически подстраивается под размеры родительского компонента. Не дает содержимому вылезти за края контейнера.

Например: 

```tsx
<div style={{width: "30em", height: "30em"}}>
    <AutoSizer>
      {({ width, height }) => (
        <img style={{height: height, width: width}} src="https://cdnn21.img.ria.ru/images/156087/28/1560872802_0:680:1536:1832_1920x0_80_0_0_13851eec92ec40195a70b46caeba8116.jpg" alt="cat" />          
      )}
    </AutoSizer>
</div>
```

Принимает в себя `height` и `width`, которые можно передать как пропсы дальше. ДОЛЖЕН иметь родительский компонент, в котором будут заданы размеры. Удобен при необходимости вставить изображене, видео, svg, `canvas`, и тп.

Изначально подстраивает под размеры без учета `border`. Для того, чтобы содержимое отображалось внутри с учетом `border`, необходимо прописать:

```tsx
const borderWidth = 2
<AutoSizer heightRequest={(h) => h - 2 * borderWidth} widthRequest={(w) => w - 2 * borderWidth}>
    ...
</AutoSizer>
```
, где borderWidth - ширина `border`.
