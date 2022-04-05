# Вводный брифинг по компонентам шаблонизатора react-declarative

## Как работают `columns` в разметке?

>    `columns` отвечают за разметку. Работает по логике grid. Отвечает за то, какое пространство по ширене будет занимать определенный элемент. Самое большое значение - '12' (`columns` имеет тип `string`) - что означет всю ширину. Значение "6" - будет означать половину ширины, "4" - 1/3 ширины "3" - 1/4 и так далее. P.s.: под шириной имеется ввиду ширина родителя.
Дефолтное значение - "12".

Например: 

```tsx
...
{
    type: FieldType.Group,
    fields: [
      {
        type: FieldType.Rating,
        columns: "2",
        desctopColumns: '2',
        tabletColumns: '2',
        phoneColumns: '12',
        fieldBottomMargin: "0",
        fieldBottomMargin: "0",
        name: "rating",
        defaultValue: 3
      },
      {
        type: FieldType.Group,
        columns: "10",
        desctopColumns: '10',
        tabletColumns: '10',
        phoneColumns: '12',
        fields: [
          {
            name: 'name',
            type: FieldType.Text,
            title: 'Name',
          }
        ]
      }
    ]
}
...         
...          
```
Т.е. элемент Rating будет занимать 20% ширины, а второй элемет Group - 80% ширины.

**desctopColumns** - используются для разметки на компьютере;

**tabletColumns** - используются для разметки на планшете;

**phoneColumns** - используются для разметки на смартфоне;

Можно настроить `mrgin` снизу и справа исполшьзуя `fieldBottomMargin` и `fieldBottomMargin` соответственно.
