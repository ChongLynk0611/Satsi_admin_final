import React from 'react'

class Thumb extends React.Component {
    state = {
      thumb: undefined,
    };
  
    componentWillReceiveProps(nextProps) {
      if (!nextProps.file) { return; }
  
      this.setState({ loading: true }, () => {
        let reader = new FileReader();
  
        reader.onloadend = () => {
          this.setState({ loading: false, thumb: reader.result });
        };
  
        reader.readAsDataURL(nextProps.file);
      });
    }
  
    render() {
      const { file } = this.props;
      const { thumb } = this.state;
  
      if (!file) { return null; }
  
      return (<img src={thumb}
        alt={file.name}
        className="img-thumbnail mt-2"
        height={400}
        width={600} />);
    }
}

export default Thumb;