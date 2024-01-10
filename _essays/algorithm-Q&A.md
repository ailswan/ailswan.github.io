---
layout: essay_single
title: algorithm Q&A
date: 2024-01-10
tags:
  - algorithm
categories:
- Notes
- algorithm
feature_text: |
  ## algorithm Q&A
  Post by ailswan Jan. 10, 2024
feature_image: "https://picsum.photos/2560/600?image=865"
---
 
## Problem 1: Differentiating L1 and L2 Norms

Given a vector `x`, the L1 norm (denoted as `||x||_1`) is defined as the sum of the absolute values of its elements. It is also referred to as the "Sparse Rule Operator" or "Lasso Regularization." For example, if `A = [1, -1, 3]`, then the L1 norm of `A` is calculated as `|1| + |-1| + |3|`.

In summary:

- **L1 Norm (`||x||_1`):** The sum of the absolute values of the elements of vector `x`.
- **L2 Norm (`||x||_2`):** The square root of the sum of the squared elements of vector `x`, also known as Euclidean norm or Frobenius norm.
- **Lp Norm (`||x||_p`):** The p-th root of the sum of the absolute values raised to the power of `p` for each element in vector `x`.

In the context of support vector machine (SVM) learning, L1 norm regularization is a process of optimizing the cost function. Incorporating L1 norm into the cost function promotes sparsity in the learned results, facilitating feature extraction.

- L1 norm induces sparsity in weight values, aiding in feature extraction.
- L2 norm helps prevent overfitting and enhances the model's generalization capability.

---

## Problem 2: Causes of Overfitting

**1. Small Dataset:**
   - Overfitting is prone to occur when the dataset is too small. If a small subset of data perfectly fits a certain pattern (e.g., a 3rd-degree function), a machine learning or deep learning model might generalize it as a simpler model (e.g., a linear function). Applying this model to a test set would result in poor performance.

**2. Inconsistent Training and Validation Set Distributions:**
   - Overfitting can arise if the training set is not representative of the distribution of the validation set. A model trained on data with a particular distribution may perform poorly on data with a different distribution.

**3. Excessive Model Complexity:**
   - Choosing a highly complex model for a task with a simple underlying pattern may lead to overfitting. The complexity of the model should match the complexity of the data.

**4. Poor Data Quality:**
   - Low-quality data with noise can mislead the model during the learning process. Learning noise as a pattern diminishes the generalization capability of the model, resulting in poor predictions.

**5. Overtraining:**
   - Overtraining occurs when a model is trained for an extended period, leading it to learn noise and specific patterns present in the training data. This negatively impacts the model's performance on new data.

---

## Problem 3: Solutions to Overfitting

- **Early Stopping:**
  - Stop training after multiple iterations if there is no significant improvement in model performance.

- **Data Augmentation:**
  - Increase the size of the dataset by introducing variations, adding random noise, or resampling.

- **Regularization:**
  - Use regularization techniques to constrain the complexity of the model.

- **Cross-Validation:**
  - Divide the dataset into multiple folds for training and validation to assess model performance across different subsets.

- **Feature Selection/Dimensionality Reduction:**
  - Reduce the number of features to prevent overfitting.

- **Validation Set Creation:**
  - Create a separate validation set to evaluate the model's performance, distinct from the training set.

---

## Problem 4: How to Address Overfitting

- **Dropout:**
  - Introduce dropout layers during training to randomly deactivate neurons, preventing overreliance on specific neurons.

- **Regularization:**
  - Apply regularization techniques to penalize large weights or complex model structures.

- **Batch Normalization:**
  - Normalize activations within a layer to stabilize and accelerate the training process.

---

## Problem 5: Binary Search Basic Principles

The concept of "Binary Search" is commonly encountered in our daily lives and work. It continuously narrows down the search range until the target element is found or determined to be absent. The process of "continuously narrowing down the search range" follows the principle of "Divide and Conquer," also known as the reduction-to-solution approach.

Introduction to the "Divide and Conquer" Principle:
Here, "Divide" means reducing the size of the problem, and "Conquer" means solving it. The "Divide and Conquer" approach is essentially an "exclusion method." In each round, a certain range, where the target element definitely does not exist, is excluded. The search continues within the remaining potentially valid range.

This approach gradually reduces the size of the problem with each judgment and operation. Since the size of the problem is finite, it can be solved through a finite number of operations.

While some may have heard of the "Divide and Conquer" principle, the difference between "Divide and Conquer" and "Reduction-to-Solution" lies in the fact that, after splitting a problem into several sub-problems, the problem solved using "Reduction-to-Solution" is found within only one of these sub-problems.

---

## Problem 6: Resolving the Cold Start Problem in Recommendation Systems

- **Provide Non-personalized Recommendations:**
  - For example, recommending popular rankings allows users to explore popular items. Later, when user data is collected, it can switch to personalized recommendations.

- **Utilize User Registration Information:**
  - Users provide information such as age, gender, occupation, ethnicity, education, and location during registration for coarse-grained personalization. Some websites also let users describe their interests in text.

- **Use Social Network Information:**
  - Encourage users to log in via social network accounts (with user authorization), import friend information, and then recommend items liked by their friends.

---

## Problem 7: Decision Tree Algorithms

Decision tree algorithms include:

- **ID3:** The core of ID3 algorithm is to apply the information gain criterion at each node of the decision tree to choose features, recursively building the decision tree.

- **C4.5:** The core of C4.5 algorithm is to use the information gain ratio to choose features during the generation process.

- **CART (Classification and Regression Trees):** The core of CART algorithm is to use the Gini index to choose features during the generation process.

Other algorithms based on decision trees include Random Forest, Gradient Boosted Decision Trees (GBDT), XGBoost, and more.

---

## Problem 8: Difference Between Recall and Ranking

- **Recall's Purpose:**
  - The goal of recall is to reduce the number of candidates (ideally within 1000) for efficient subsequent precise ranking using complex models.

- **Speed in Recall:**
  - Since the evaluation of a massive number of candidates needs to be done quickly, the key point for recall is speed. Compared to ranking, recall algorithms have relatively simple models and use fewer features.

- **Complexity in Ranking:**
  - Ranking models are more complex, aiming for accuracy. They use more features to achieve higher precision.

---
## Problem 9: Methods to Alleviate Gradient Vanishing, Exploding, and Diverging

**1. Gradient Vanishing:**
   - According to the chain rule, if the product of the partial derivative of each neuron in each layer with respect to the output of the previous layer and the weight is consistently less than 1, the derivative of the error with respect to the input of the input layer tends to 0 after many layers of propagation.
   - Using ReLU activation function can effectively address the issue of gradient vanishing.

**2. Gradient Diverging:**
   - According to the chain rule, if the product of the partial derivative of each neuron in each layer with respect to the output of the previous layer and the weight is consistently greater than 1, the derivative of the error with respect to the input of the input layer tends to infinity after many layers of propagation.
   - Activation functions can be used to mitigate this issue.

**3. Gradient Exploding:**
   - To address the problem of gradient exploding, the solution is to introduce Gradient Clipping.
   - By applying Gradient Clipping, the gradients are constrained within a specified range, preventing them from becoming too large.

---

## Problem 10: Drawbacks of Batch Normalization

- **Small Batch Sizes Result in Large Fluctuations:**
  - Small batch sizes can lead to significant fluctuations.
  
- **Issues with Text Data and Variable Lengths:**
  - Batch normalization faces challenges when dealing with text data due to varying effective lengths of different sequences.

- **Significant Differences in Mean and Variance on Test Set:**
  - If there are substantial differences in mean and variance between training and test sets, batch normalization may not be suitable.

*Note: LN (Layer Normalization) involves subtracting the mean and dividing by the standard deviation for a sample at a specific time step, followed by parameter learning.*

---

## Problem 11: How to Perform Word Segmentation?

Word segmentation can be done through:

- **Rule-Based Methods (Using Extensive Word Lists):**
  - Based on predefined rules and extensive word lists.

- **Statistical Methods (Co-occurrence Statistics):**
  - Based on statistical measures, such as co-occurrence frequency, where words appearing together more often are likely to form a meaningful segment.

- **Neural Network Approaches (LSTM + CRF for Part-of-Speech Tagging):**
  - Utilizing neural networks, such as Long Short-Term Memory (LSTM) networks combined with Conditional Random Fields (CRF) for part-of-speech tagging, can be effective for word segmentation.

---

## Problem 12: Why Apply 3/4 Power to Frequency in Negative Sampling for Word2Vec?

To ensure that high-frequency words are more likely to be sampled, the 3/4 power is applied to the word frequencies during negative sampling. This way, the probability of low-frequency and rare words being sampled is increased. Without this adjustment, rare words might be sampled too infrequently and fail to update their corresponding embeddings.

---

## Problem 13: Two Optimization Approaches for Word2Vec

1. **Hierarchical Softmax Model:**
   - Construct a Huffman tree based on word frequencies.
   - Apply Huffman coding, assigning 1 for the left subtree and 0 for the right subtree.
   - Use binary logistic regression to learn the model parameters based on the constructed tree.
   - Advantages include reduced computation complexity (log2V) and better handling of high-frequency and low-frequency words.

2. **Negative Sampling Model:**
   - Sample a small set of negative examples.
   - Utilize binary logistic regression to learn the model parameters for both positive and negative examples.
   - Sampling is based on word frequencies, with a 3/4 power applied to the frequencies.
   - Advantages include improved efficiency and handling of rare words.

---
## Problem 14: Principles and Pros/Cons of CNN

CNN (Convolutional Neural Network) is a type of feedforward neural network typically consisting of 5 layers: input layer, convolutional layer, activation layer, pooling layer, and fully connected (FC) layer. The core components are the convolutional layer and the pooling layer.

**Advantages:**

- **Shared Convolutional Kernels:**
  - Efficient handling of high-dimensional data by sharing convolutional kernels.
- **Automated Feature Selection:**
  - No need for manual feature selection.

**Disadvantages:**

- **Requires Tuning:**
  - Hyperparameter tuning is necessary.
- **Large Data Requirement:**
  - Requires a substantial amount of data.

---

## Problem 15: Description and Applications of CRF Model

CRF (Conditional Random Field) is a model that calculates the conditional probability density function of one group of output random variables given another group of input random variables.

The CRF model assumes that the output variables form a Markov Random Field. It is commonly used for sequence labeling tasks and structured prediction problems. The solution involves maximum likelihood estimation or regularized maximum likelihood estimation.

---

## Problem 16: Structure of Transformer

Transformer is a typical encoder-decoder model with both the encoder and decoder consisting of 6 blocks. Each block in the encoder has two modules: multi-head self-attention and a feedforward neural network. Each block in the decoder has three modules: multi-head self-attention, multi-head encoder-decoder attention, and a feedforward neural network. Both encoder and decoder blocks include residual layers and layer normalization.

---

## Problem 17: Differences Between ELMo and BERT

- **BERT:**
  - Utilizes the Transformer architecture's Encoder module.

- **ELMo:**
  - Uses a bi-layer bidirectional LSTM module.

---

## Problem 18: Differences Between ELMo and Word2Vec

ELMo word embeddings contain contextual information and are not fixed. They change dynamically based on the surrounding context.

---

## Problem 19: Differences Between LSTM and GRU

1. **Performance Similarity:**
   - LSTM and GRU perform comparably on many tasks.

2. **Parameter Count:**
   - GRU has fewer parameters, making it easier to converge. However, LSTM performs better on large datasets.

3. **Gating Mechanisms:**
   - GRU has two gates (update and reset), while LSTM has three gates (forget, input, output).
   - GRU directly passes the hidden state to the next unit, while LSTM wraps the hidden state with a memory cell.

---
## Problem 20: Basic Concepts in Image Processing - Histogram Equalization, Wiener Filtering, and Sharpening

**Histogram Equalization:**
Histogram Equalization is a method for enhancing image contrast. It transforms the distribution of pixel intensities in an image to approximately achieve a uniform distribution, thus enhancing the image's contrast.

**Wiener Filtering:**
Wiener filter is a linear filter that minimizes the mean square error between the estimated and true signals. It is an optimal filter under certain constraints. The output is adjusted based on the noise variance and the desired output.

**Sharpening Filter:**
Sharpening filters use local differentials as operators to increase the difference between neighboring pixel values, making transitions in the image more pronounced. The purpose of sharpening is to enhance the edges and contours of an image, often referred to as a high-pass filter.

---

## Problem 21: Batch Normalization (BN) Process and Why Testing and Training Differ

For BN, during training, normalization is performed on each batch of training data using batch-specific mean and variance. During testing, where there is no concept of batches, the mean and variance used are those calculated over the entire training dataset, typically obtained through moving average.

---

## Problem 22: Brief Introduction to the Gradient Boosting Decision Tree (GBDT) Algorithm

GBDT (Gradient Boosting Decision Tree) is a boosting algorithm based on decision trees. It uses decision trees as base learners in an additive model, continuously fitting the residuals of the previous weak learner. It is commonly employed for both classification and regression tasks.

Key Points:
- Utilizes decision trees as base learners.
- Constructs trees to minimize the negative gradient of the loss function.
- Typically employs exponential loss for classification and squared error loss for regression.

---

## Problem 23: Is PCA Supervised or Unsupervised?

PCA (Principal Component Analysis) is an unsupervised learning method. It focuses on transforming the feature space of the dataset without considering any labeled output (y). It is used for dimensionality reduction and capturing the principal components in the data.

---

## Problem 24: Differences Between PyTorch and TensorFlow

1. **Graph Creation:**
   - PyTorch: Uses dynamic computation graphs constructed during runtime.
   - TensorFlow: Utilizes static computation graphs compiled before runtime.

2. **Flexibility:**
   - PyTorch: Dynamic computation graph allows for easy understanding and debugging.
   - TensorFlow: Static computation graph can be less intuitive and challenging for debugging.

3. **Device Management:**
   - PyTorch: Requires explicit device management.
   - TensorFlow: Device management is handled more seamlessly.
  
---

## Problem 25: torch.eval() Function

The `torch.eval()` function in PyTorch is used to set the model to evaluation mode. It affects the behavior of certain layers in the model such as Batch Normalization (BN) and dropout during inference.

### Impact on Batch Normalization (BN):
During training, BN typically uses mini-batches, so the mean and standard deviation are roughly constant within each batch. In the evaluation mode (`torch.eval()`), BN parameters are fixed, utilizing the global mean and standard deviation learned during training.

### Impact on Dropout:
During training, dropout randomly deactivates neurons by multiplying them by a probability (P) before activation. In the evaluation mode, the order is reversed, where neurons are first activated, and then their outputs are multiplied by the dropout probability.

---

## Problem 26: PCA - Principle, Implementation, and Significance

### Principle:
Principal Component Analysis (PCA) is a mathematical technique for dimensionality reduction. It employs orthogonal transformations to convert a set of possibly correlated variables into a set of linearly uncorrelated variables called principal components.

### Implementation:
PCA can be implemented using eigenvalue decomposition of the covariance matrix or singular value decomposition (SVD) of the data matrix.

### Significance:
- Facilitates easier data usage.
- Reduces computational complexity.
- Noise removal.
- Enhances interpretability of results.

---

## Problem 27: Brief Overview of K-means Algorithm

The K-means algorithm is a clustering method that separates a dataset into k clusters by iteratively updating cluster centers based on the mean of points assigned to each cluster.

1. Choose k initial cluster centers (often randomly).
2. Assign each sample to the nearest cluster center based on Euclidean distance.
3. Update cluster centers by computing the mean of points in each cluster.
4. Repeat steps 2-3 until convergence.

K-means simplicity and effectiveness depend on the choice of k and initial cluster points.

---

## Problem 28: Principles of Image Edge Detection

Image edges represent rapid changes in pixel intensities. Edge detection involves identifying these abrupt transitions, typically achieved by applying filters to highlight such changes.

---

## Problem 29: Harris Corners in Image Processing

Harris corners refer to points in an image where there are significant intensity changes in any two mutually perpendicular directions.

### Importance of Using Corners as Feature Points:
- Corners provide distinctive features.
- Efficiently reduce data volume.
- Facilitate reliable image matching.
- Enable real-time processing.

---

## Problem 30: Understanding Receptive Field

Receptive field refers to the region in the input space that a neuron in a particular layer of a neural network is sensitive to. It defines the area from which a neuron gathers information. Understanding the receptive field is crucial in analyzing the network's response to different parts of the input.

 