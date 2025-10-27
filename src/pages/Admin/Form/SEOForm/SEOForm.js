import React from "react";
import { Field } from "formik";
import { Row, Col, Form as BootstrapForm } from "react-bootstrap";

const SEOForm = ({ prefix = "seo" }) => {
  return (
    <>
      <Col md={12}>
        <h5 className="mt-4 fw-bold">SEO Settings</h5>
      </Col>

      <Col md={6}>
        <BootstrapForm.Label>Meta Title</BootstrapForm.Label>
        <Field name={`${prefix}.metaTitle`} className="form-control" placeholder="Meta Title" />
      </Col>

      <Col md={6}>
        <BootstrapForm.Label>Canonical URL</BootstrapForm.Label>
        <Field name={`${prefix}.canonicalUrl`} className="form-control" placeholder="https://..." />
      </Col>

      <Col md={12}>
        <BootstrapForm.Label>Meta Description</BootstrapForm.Label>
        <Field
          as="textarea"
          name={`${prefix}.metaDescription`}
          rows="3"
          className="form-control"
          placeholder="Write meta description"
        />
      </Col>

      <Col md={12}>
        <BootstrapForm.Label>Meta Keywords</BootstrapForm.Label>
        <Field
          name={`${prefix}.metaKeywords`}
          className="form-control"
          placeholder="comma, separated, keywords"
        />
      </Col>
    </>
  );
};

export default SEOForm;
