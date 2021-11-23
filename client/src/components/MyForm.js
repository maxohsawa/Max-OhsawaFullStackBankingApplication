import { Form, Button } from 'react-bootstrap';

export default function MyForm({ fieldList, button }) {
  return (
    <div>
      <Form>
        {fieldList.map( (item, index) => {
          return (
            <Form.Group key={'formGroup'+index} className="mb-3" controlId={item.controlId}>
              <Form.Label>{item.label}</Form.Label>
              <Form.Control name={item.name} type={item.type} placeholder={item.placeholder} onChange={item.handleChange} value={item.value}/>
              {item.text && <Form.Text className="text-muted">
                {item.text}
              </Form.Text>}
            </Form.Group>
          )
          
        })}
        {button && <Button variant={button.variant} type={button.type} onClick={button.handleSubmit}>
          {button.text}
        </Button>}
        
      </Form>
    </div>
  )
}
